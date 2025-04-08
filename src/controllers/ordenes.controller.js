import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { mOrdenes } from "../models/ordenes.js";
import { mArticulo } from "../models/articulo.js";
import { mPlatillos } from "../models/platillo.js";
import { mPlatilloIngredientes } from "../models/platillo_ingredientes.js";
import { restaurante } from "../models/restaurante.js";
import { mMesas } from "../models/mesas.js";
import { mClientes } from "../models/clientes.js";
import { mOrdenesArticulos } from "../models/orden_articulos.js";

/**
 * @param {Request} req
 * @param {Response} res
 */
export const get_orden = async (req, res) => {
    try {
        const { id } = req.params;
        const resultQuery = await executeQuery(queries.get_orden, [id]);
        if (resultQuery.length === 0) return res.status(404).json({ message: "Orden no encontrada", orden: id });

        const orden = new mOrdenes(resultQuery[0]);

        // Cliente
        const resultQueryCliente = await executeQuery(queries.get_cliente, [orden.cliente]);
        if (resultQueryCliente.length > 0) orden.cliente = new mClientes(resultQueryCliente[0]);

        // Mesa
        const resultQueryMesa = await executeQuery(queries.get_mesa, [orden.mesa]);
        if (resultQueryMesa.length > 0) orden.mesa = new mMesas(resultQueryMesa[0]);

        // Artículos
        orden.articulos = [];
        const resultQueryOrdenArticulos = await executeQuery(queries.get_orden_articulos, [orden.id_orden]);
        if (resultQueryOrdenArticulos.length > 0) {
            const listOrdenArticulos = resultQueryOrdenArticulos.map((item) => new mOrdenesArticulos(item));

            for (const itemOrdenArticulo of listOrdenArticulos) {
                let articulo = null;

                if (itemOrdenArticulo.tipo === 'P') {
                    const resultPlatillo = await executeQuery(queries.get_platillo, [itemOrdenArticulo.articulo]);
                    if (resultPlatillo.length > 0) {
                        articulo = new mPlatillos(resultPlatillo[0]);
                        const resultPlatilloIngredientes = await executeQuery(queries.get_platillo_ingredintes, [articulo.id_platillos]);
                        for (const itemPlatilloIngrediente of resultPlatilloIngredientes) {
                            const platilloIngrediente = new mPlatilloIngredientes(itemPlatilloIngrediente);
                            const resultArticulo = await executeQuery(queries.get_articulo, [platilloIngrediente.ingrediente, orden.restaurante]);
                            if (resultArticulo.length > 0) {
                                articulo.ingredientes.push(new mArticulo(resultArticulo[0]));
                            }
                        }
                        orden.articulos.push(articulo);
                    }
                } else {
                    const resultArticulo = await executeQuery(queries.get_articulo, [itemOrdenArticulo.articulo, orden.restaurante]);
                    if (resultArticulo.length > 0) {
                        articulo = new mArticulo(resultArticulo[0]);
                        orden.articulos.push(articulo);
                    }
                }
            }
        }

        return res.status(200).json({ message: "", orden });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden: null, error });
    }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const get_ordenes = async (req, res) => {
    try {
        const { id } = req.params;
        const resultQuery = await executeQuery(queries.get_ordenes, [id]);
        if (resultQuery.length === 0) return res.status(200).json({ message: "No hay ordenes registradas.", restaurante: id });

        const lista_ordenes = [];
        for (const itemOrden of resultQuery) {
            const orden = new mOrdenes(itemOrden);

            // Cliente
            const resultQueryCliente = await executeQuery(queries.get_cliente, [orden.cliente]);
            if (resultQueryCliente.length > 0) orden.cliente = new mClientes(resultQueryCliente[0]);

            // Mesa
            const resultQueryMesa = await executeQuery(queries.get_mesa, [orden.mesa]);
            if (resultQueryMesa.length > 0) orden.mesa = new mMesas(resultQueryMesa[0]);

            // Artículos de la orden
            const resultQueryOrdenArticulos = await executeQuery(queries.get_orden_articulo, [orden.id_ordenes]);
            orden.articulos = [];

            if (resultQueryOrdenArticulos.length > 0) {
                const listOrdenArticulos = resultQueryOrdenArticulos.map((item) => new mOrdenesArticulos(item));

                for (const itemOrdenArticulo of listOrdenArticulos) {
                    let articulo = null;

                    if (itemOrdenArticulo.tipo === 'P') {
                        const resultPlatillo = await executeQuery(queries.get_platillo, [itemOrdenArticulo.articulo]);
                        if (resultPlatillo.length > 0) {
                            articulo = new mPlatillos(resultPlatillo[0]);

                            const resultPlatilloIngredientes = await executeQuery(queries.get_platillo_ingredintes, [articulo.id_platillos]);
                            for (const itemPlatilloIngrediente of resultPlatilloIngredientes) {
                                const platilloIngrediente = new mPlatilloIngredientes(itemPlatilloIngrediente);
                                const resultArticulo = await executeQuery(queries.get_articulo, [platilloIngrediente.ingrediente, orden.restaurante]);
                                if (resultArticulo.length > 0) {
                                    articulo.ingredientes.push(new mArticulo(resultArticulo[0]));
                                }
                            }

                            orden.articulos.push(articulo);
                        }
                    } else {
                        const resultArticulo = await executeQuery(queries.get_articulo, [itemOrdenArticulo.articulo, orden.restaurante]);
                        if (resultArticulo.length > 0) {
                            articulo = new mArticulo(resultArticulo[0]);
                            orden.articulos.push(articulo);
                        }
                    }
                }
            }
            lista_ordenes.push(orden);
        }

        return res.status(200).json({ message: "", ordenes: lista_ordenes });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden: null, error });
    }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const post_orden = async (req, res) => { 
    try {
        const orden = new mOrdenes(req.body);
        const resultQuery = await executeQuery(queries.post_orden, [orden.restaurante, orden.mesa, orden.cliente, orden.fecha, orden.estado]);
        if (resultQuery.affectedRows === 0) return res.status(400).json({ message: "No se pudo registrar la orden.", orden: null });
        orden.id_orden = resultQuery.insertId;
        return res.status(200).json({ message: "Orden registrada correctamente.", orden: orden });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden: null, error });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const put_orden = async (req, res) => { 
    try {
        const orden = new mOrdenes(req.body);

        const resultQueryOrden = await executeQuery(queries.get_orden, [orden.id_orden]);
        if (resultQueryOrden.length == 0) return res.status(200).json({ message: "No se encontro la orden a actualizar", orden: null });
        const oldOrden = new mOrdenes(resultQueryOrden[0]);

        if(oldOrden.cliente == orden.cliente) {   
            if(oldOrden.mesa != orden.mesa) {
                let resultQuerryMesaEstado1 = await executeQuery(queries.update_mesa_estado, ['L', oldOrden.mesa, oldOrden.restaurante]);
                if (resultQuerryMesaEstado1.affectedRows == 0) return res.status(200).json({ message: "No se pudo actualizar la mesa", orden: null });
            } else {
                let resultQuerryMesaEstado1 = await executeQuery(queries.update_mesa_estado, ['O', oldOrden.mesa, oldOrden.restaurante]);
                if (resultQuerryMesaEstado1.affectedRows == 0) return res.status(200).json({ message: "No se pudo actualizar la mesa", orden: null });
            }
        }

        const resultQuery = await executeQuery(queries.update_orden, [orden.restaurante, orden.mesa, orden.cliente, orden.fecha, orden.estado, orden.id_orden]);        
        if (resultQuery.affectedRows === 0) return res.status(400).json({ message: "No se pudo actualizar la orden.", orden: null });
        return res.status(200).json({ message: "Orden actualizada correctamente.", orden: orden });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden: null, error });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const put_orden_state = async (req, res) => { 
    try {
        const { id, estado } = req.params;
        const resultQuery = await executeQuery(queries.update_orden_estado, [estado, id]);

        if(estado === 'T') {
            let resultQuerryMesaEstado = await executeQuery(queries.update_mesa_estado, ['L', id, orden.restaurante]);
            if (resultQuerryMesaEstado.affectedRows == 0) return res.status(200).json({ message: "No se pudo actualizar la mesa", orden: null });
        }

        if (resultQuery.affectedRows === 0) return res.status(400).json({ message: "No se pudo actualizar la orden.", orden: null });
        return res.status(200).json({ message: "Orden actualizada correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden: null, error });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const delete_orden = async (req, res) => { 
    try {
        const { id } = req.params;
        
        const resultQuery3 = await executeQuery(queries.get_orden, [id]);
        if (resultQuery3.length == 0) return res.status(200).send("No se encontro la orden a eliminar");
        const orden = new mOrdenes(resultQuery3[0]);
        
        let resultQuerryMesaEstado = await executeQuery(queries.update_mesa_estado, ['L', orden.mesa, orden.restaurante]);
        if (resultQuerryMesaEstado.affectedRows == 0) return res.status(200).send("No se pudo actualizar la mesa");
        
        const resultQuery1 = await executeQuery(queries.delete_orden_articulos_orden, [id]);
        if (resultQuery1.affectedRows === 0) return res.status(400).json({ message: "No se pudo eliminar los artículos de la orden.", orden_articulo: null });
        const resultQuery2 = await executeQuery(queries.delete_orden, [id]);
        if (resultQuery2.affectedRows === 0) return res.status(400).json({ message: "No se pudo eliminar la orden.", orden: null });
        return res.status(200).json({ message: "Orden eliminada correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden: null, error });
    }
}

// Tabla Intermedia Orden_Articulos
/**
 * @param {Request} req
 * @param {Response} res
 */
export const post_orden_articulo = async (req, res) => {
    try {
        const ordenArticulo = new mOrdenesArticulos(req.body);
        const resultQuery = await executeQuery(queries.post_orden_articulos, [ordenArticulo.orden, ordenArticulo.articulo, ordenArticulo.tipo]);
        
        const resultQuery3 = await executeQuery(queries.get_orden, [ordenArticulo.orden]);
        if (resultQuery3.length == 0) return res.status(200).json({  message: "No se puede agregar un articulo, por que no se encontro la orden", orden: null });
        const orden = new mOrdenes(resultQuery3[0]);

        if(orden.estado === 'P') {
            let resultQuerryMesaEstado = await executeQuery(queries.update_mesa_estado, ['O', orden.mesa, orden.restaurante]);
            if (resultQuerryMesaEstado.affectedRows == 0) return res.status(200).json({ message: "No se pudo actualizar la mesa", orden: null });
        }

        if (resultQuery.affectedRows === 0) return res.status(400).json({ message: "No se pudo registrar el artículo en la orden.", orden_articulo: null });
        return res.status(200).json({ message: "Artículo registrado correctamente en la orden.", orden_articulo: ordenArticulo });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden_articulo: null, error });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const put_orden_articulo = async (req, res) => {
    try {
        const { orden, articulo, articuloN, tipo } = req.body;
        const ordenArticulo = new mOrdenesArticulos({ orden, articuloN, tipo });
        const resultQuery = await executeQuery(queries.update_orden_articulos, [ordenArticulo.articulo, ordenArticulo.tipo, ordenArticulo.orden, articulo]);
        if (resultQuery.affectedRows === 0) return res.status(400).json({ message: "No se pudo actualizar el artículo en la orden.", orden_articulo: null });
        return res.status(200).json({ message: "Artículo actualizado correctamente en la orden.", orden_articulo: ordenArticulo });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden_articulo: null, error });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const delete_orden_articulo = async (req, res) => {
    try {
        const ordenArticulo = new mOrdenesArticulos(req.body);
        const resultQuery = await executeQuery(queries.delete_orden_articulos, [ordenArticulo.orden, ordenArticulo.articulo, ordenArticulo.tipo]);
        if (resultQuery.affectedRows === 0) return res.status(400).json({ message: "No se pudo eliminar el artículo de la orden.", orden_articulo: null });
        return res.status(200).json({ message: "Artículo eliminado correctamente de la orden." });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", orden_articulo: null, error });
    }
}