import { getConnection, executeQuery, executeQueryTR, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { mArticulo } from "../models/articulo.js";

export const get_articulo = async (req, res) => {
    try {
        const { restaurante, articulo } = req.params;
        let result = await executeQuery(queries.get_articulo, [restaurante, articulo]);
        if (result.length > 0) {
            const articulo = new mArticulo(result[0]);
            return res.status(200).json({ message: "", articulo: articulo });
        } else {
            return res.status(200).json({ message: "No se encontro el articulo buscado.", articulo: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", articulo: null, error: error });
    }
}

export const get_inventario = async (req, res) => {
    try {
        const { restaurante } = req.params;
        let result = await executeQuery(queries.get_inventario, [restaurante]);
        if (result.length > 0) {
            const inventario = result.map((item) => new mArticulo(item));
            return res.status(200).json({ message: "", inventario: inventario });
        } else {
            return res.status(200).json({ message: "No hay articulos registrados.", inventario: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", inventario: null, error: error });
    }
}

export const get_inventario_tipo = async (req, res) => {
    try {
        const { restaurante, tipo } = req.params;
        let result = await executeQuery(queries.get_inventario, [restaurante, tipo]);
        if (result.length > 0) {
            const inventario = result.map((item) => new mArticulo(item));
            return res.status(200).json({ message: "", inventario: inventario });
        } else {
            return res.status(200).json({ message: "No hay articulos registrados.", inventario: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", inventario: null, error: error });
    }
}

export const post_articulo = async (req, res) => {
    const articulo = new mArticulo(req.body);
    try {
        let result = await executeQuery(queries.post_articulo, [articulo.restaurante, articulo.articulo, articulo.cantidad, articulo.fecha_caducidad, articulo.tipo]);
        if (result.affectedRows == 0) return res.status(200).json({ message: "No se registro el articulo.", articulo: null });
        articulo.id_articulo = result.insertId;
        return res.status(200).json({ message: "Articulo registrado correctamente.", articulo: articulo });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "No se pudo registrar el articulo.", articulo: req.body, error: error });
    }
}

export const put_articulo = async (req, res) => {
    const articulo = new mArticulo(req.body);
    try {
        let result = await executeQuery(queries.update_articulo, [articulo.articulo, articulo.cantidad, articulo.fecha_caducidad, articulo.tipo, articulo.restaurante, articulo.id_articulo]);
        if (result.affectedRows == 0) return res.status(200).json({ message: "No se actualizo el articulo.", articulo: null });
        return res.status(200).json({ message: "Articulo Actualizado", articulo: articulo });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", articulo: req.body, error: error });
    }
}

export const delete_articulo = async (req, res) => {
    try {
        const { restaurante, articulo } = req.params;
        let resultRequest = await executeQuery(queries.get_articulo, [restaurante, articulo]);
        if (resultRequest.length == 0) return res.status(200).json({ message: "No se encontro el articulo buscado.", articulo: null });
        const articuloData = new mArticulo(resultRequest[0]);
        let result2 = await executeQuery(queries.delete_articulo, [articulo]);
        if (result2.affectedRows > 0) {
            return res.status(200).json({ message: "Articulo eliminado correctamente.", articulo: articuloData });
        } else {
            return res.status(200).json({ message: "No se pudo eliminar el articulo.",  articulo: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "No se pudo ejecutar la consulta.",  articulo: null, error: error });
    }
}