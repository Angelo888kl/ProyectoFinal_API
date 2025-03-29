import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { direcciones } from "../models/dirrecciones.js";

export const get_direccion = async (req, res) => {}

export const post_direccion = async (req, res) => {
    try {
        const { direccion } = req.body;
        let result = await executeQuery(queries.post_direccion, [direccion]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
};

export const put_direccion = async (req, res) => {
    try {
        const { direccion } = req.body;
        let result = await executeQuery(queries.update_direccion, [direccion]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
};

export const delete_direccion = async (req, res) => {
    try {
        const { direccion } = req.params;
        let result = await executeQuery(queries.delete_direccion, [direccion]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
};
