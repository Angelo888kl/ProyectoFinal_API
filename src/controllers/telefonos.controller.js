import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { telefonos } from "../models/telefonos.js";

export const get_telefono = async (req, res) => {}

export const post_telefono = async (req, res) => {
    let connection = null;
    try {
        connection = await getConnection();
        if (connection == null) return res.status(400).send("Error del servidor");
        const { telefono } = req.body;
        let result = await executeQuery(queries.post_telefono, [telefono]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
};

export const put_telefono = async (req, res) => {
    try {
        const { telefono } = req.body;
        let result = await executeQuery(queries.update_telefono, [telefono]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
};

export const delete_telefono = async (req, res) => {
    try {
        const { telefono } = req.params;
        let result = await executeQuery(queries.delete_telefono, [telefono]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
};