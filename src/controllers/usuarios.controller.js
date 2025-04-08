import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { mUsuarios } from "../models/usuarios.js";

export const get_usuario = async (req, res) => {
    try {
        const { id } = req.params;
        const resultQuery = await executeQuery(queries.get_usuario, [id]);
        if(resultQuery.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        const usuario = new mUsuarios(resultQuery[0]);
        return res.status(200).json({ message: "", usuario: usuario });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", usuario: null, error: error });
    }
}

export const get_usuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const resultQuery = await executeQuery(queries.get_usuarios_restaurante, [id]);
        if(resultQuery.length === 0) return res.status(404).json({ message: "No hay registro de usuarios" }); 
        const listaUsuarios = resultQuery.map(usuario => new mUsuarios(usuario));    
        return res.status(200).json({ message: "", usuarios: listaUsuarios });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", usuario: null, error: error });
    }
}

export const post_usuario = async (req, res) => {
    try {
        const usuario = new mUsuarios(req.body);
        let resultQuery = await executeQuery(queries.post_usuario, [usuario.restaurante, usuario.nombre_usuario, usuario.contraseña, usuario.correo, usuario.rol, 'N']);
        if(resultQuery.affectedRows === 0) return res.status(400).json({ message: "Error al registrar usuario", usuario: null });
        usuario.id_usuarios = resultQuery.insertId;
        return res.status(200).json({ message: "Usuario Registrado Correctamente", usuario: usuario });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", usuario: null, error: error });
    }
};

export const put_usuario = async (req, res) => {
    try {
        const usuario = new mUsuarios(req.body);
        let resultQuery = await executeQuery(queries.update_usuario, [usuario.restaurante, usuario.nombre_usuario, usuario.contraseña, usuario.correo, usuario.rol, usuario.bloqueada, usuario.id_usuarios]);
        if(resultQuery.affectedRows === 0) return res.status(400).json({ message: "Error al registrar usuario", usuario: null });
        usuario.id_usuario = resultQuery.insertId;
        return res.status(200).json({ message: "Usuario Actualizado Correctamente", usuario: usuario });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", usuario: null, error: error });
    }
};


export const delete_usuario = async (req, res) => {
    try {
        const { id } = req.params;
        const resultQuery = await executeQuery(queries.delete_usuario, [id]);
        if(resultQuery.affectedRows === 0) return res.status(400).json({ message: "Error al eliminar el usuario", usuario: null });
        return res.status(200).json({ message: "Usuario Eliminado Correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", usuario: null, error: error });
    }
};
