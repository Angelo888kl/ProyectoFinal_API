import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { direcciones } from "../models/dirrecciones.js";

export const get_direccion = async (req, res) => {
    try {
        const { id } = req.params;
        let result = await executeQuery(queries.get_direccion, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontró la dirección" });
        }
        return res.status(200).json({ message: "Consulta exitosa", direccion: result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error });
    }
}

export const post_direccion = async (req, res) => {
    try {
        const direccion = new direcciones(req.body);
        let result = await executeQuery(queries.post_direccion, [direccion.provincia, direccion.canton, direccion.distrito, direccion.direccion]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Error al registrar la dirección" });
        }
        direccion.id_direcciones = result.insertId;
        return res.status(200).json({ message: "Registro exitoso", direccion });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error });
    }
};

export const put_direccion = async (req, res) => {
    try {
        const direccion = new direcciones(req.body);
        let result = await executeQuery(queries.post_direccion, [direccion.provincia, direccion.canton, direccion.distrito, direccion.direccion, direccion.id_direcciones]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Error al actualizar la dirección" });
        }
        return res.status(200).json({ message: "Actualización exitosa", direccion });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error });
    }
};

export const delete_direccion = async (req, res) => {
    try {
        const { id } = req.params;
        let result = await executeQuery(queries.delete_direccion, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No se encontró la dirección" });
        }
        return res.status(200).json({ message: "Eliminación exitosa" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error });
    }
};
