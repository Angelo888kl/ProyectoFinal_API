import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { telefonos } from "../models/telefonos.js";

export const post_telefono = async (req, res) => {
    let connection = null;
    try {
        const { data } = req.body;
        const telefono = new telefonos(data);
        if (connection == null) return res.status(400).json({ message: "Error en la conexión", telefono: telefono  });
        let result = await executeQuery(queries.post_telefono, [telefono.num_telefono_movil, telefono.num_telefono_fijo]);
        if (result.affectedRows == 0) return res.status(400).json({ message: "Error al crear telefono", telefono: telefono });
        telefono.id_telefonico = result.insertId;
        return res.status(200).json({ message: "Telefono creado", telefono: telefono });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error: error });
    }
};

export const put_telefono = async (req, res) => {
    try {
        const { data } = req.body;
        const telefono = new telefonos(data);
        let result = await executeQuery(queries.update_telefono, [telefono.num_telefono_movil, telefono.num_telefono_fijo, telefono.id_telefonico]);
        if (result.affectedRows == 0) return res.status(400).json({ message: "Error al actualizar telefono", telefono: telefono });
        return res.status(200).json({ message: "Telefono actualizado", telefono: telefono });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error: error });
    }
};

export const delete_telefono = async (req, res) => {
    try {
        const { id } = req.params;
        let result = await executeQuery(queries.delete_telefono, [id]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error: error });
    }
};