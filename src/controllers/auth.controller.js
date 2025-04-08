import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

// importaciones de clases
import { mUsuarios } from "../models/usuarios.js";
import { fLogin, mLogin } from "../models/login.js";

export const log_in = async (req, res) => {
    const userData = new fLogin(req.body.username, req.body.password);
    try {
        const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const resultQuery = await executeQuery(queries.get_usuario_login, [userData.username, userData.password]);

        if (resultQuery.length === 0) {
            return res.status(401).json({ message: "Datos Incorrectos" });
        }

        const usuario = new mUsuarios(resultQuery[0]);

        if (usuario.bloqueada === 'S') {
            return res.status(401).json({ message: "Usuario Bloqueado" });
        }

        const resultQueryLogin = await executeQuery(queries.get_login, [usuario.id_usuarios]);

        let resultQueryLoginAction;

        if (resultQueryLogin.length === 0) {
            resultQueryLoginAction = await executeQuery(queries.post_login, [usuario.id_usuarios, fecha, 'A']);
        } else {
            resultQueryLoginAction = await executeQuery(queries.update_login, [fecha, 'A', usuario.id_usuarios]);
        }

        if (resultQueryLoginAction.affectedRows === 0) {
            return res.status(500).json({ message: "Error al iniciar sesión" });
        }

        const login = new mLogin(usuario.id_usuarios, fecha, 'A');
        return res.status(200).json({ message: "Inicio de sesión exitoso", usuario, login });

    } catch (error) {
        return res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};

export const log_out = async (req, res) => {
    try {
        const { id } = req.params;
        const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const resultQuery = await executeQuery(queries.update_login, [fecha, 'D', id]);

        if (resultQuery.affectedRows === 0) {
            return res.status(500).json({ message: "Error al cerrar sesión" });
        }

        return res.status(200).json({ message: "Cierre de sesión exitoso" });

    } catch (error) {
        return res.status(500).json({ message: "Error al cerrar sesión", error });
    }
};
