import { getConnection, executeQuery, executeQueryTR, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { restaurante } from "../models/restaurante.js";
import { telefonos } from "../models/telefonos.js";
import { direcciones } from "../models/dirrecciones.js";
import { mMesas } from "../models/mesas.js";
import { mMenu } from "../models/menu.js";
import { mMenuArticulos } from "../models/menu_articulos.js";
import { mPlatillos } from "../models/platillo.js";
import { mPlatilloIngredientes } from "../models/platillo_ingredientes.js";
import { mArticulo } from "../models/articulo.js";

/**
 * @param {Request} req
 * @param {Response} res
 */
export const get_restaurante = async (req, res) => {
    try {
        const { id } = req.params;
        let resultRequest = null;
        if (id > 0) {
            resultRequest = await executeQuery(queries.get_restaurante, [id]);
            if (resultRequest.length > 0) {
                const restauranteData = new restaurante(resultRequest[0]);
                const resultTelefono = await executeQuery(queries.get_telefono, [restauranteData.telefono]);
                restauranteData.telefono = new telefonos(resultTelefono[0]);
                const resultDireccion = await executeQuery(queries.get_direccion, [restauranteData.direccion]);
                restauranteData.direccion = new direcciones(resultDireccion[0]);
                const resultQueryGetMesas = await executeQuery(queries.get_mesas, [id]);
                restauranteData.mesas = resultQueryGetMesas.map((item) => new mMesas(item));
                const resultQueryGetMenu = await executeQuery(queries.get_menu_restaurante, [id]);
                if (resultQueryGetMenu.length > 0) {
                    const menus = resultQueryGetMenu.map((item) => new mMenu(item));
                    for (const menu of menus) {
                        const itemsMenu = await executeQuery(queries.get_menu_articulo, [menu.id_menu]);
                        menu.platillos = [];
                        menu.bebidas = [];
                        menu.otros = [];
                        for (const item of itemsMenu) {
                            const instancia = new mMenuArticulos(item);
                            if (item.tipo === "P") {
                                const resultQueryPlatillo = await executeQuery(queries.get_platillo, [instancia.articulo]);
                                if (resultQueryPlatillo.length != 0) {
                                    const platillo = new mPlatillos(resultQueryPlatillo[0]);
                                    platillo.ingredientes = [];
                                    const resultQueryPlatilloIngrediente = await executeQuery(queries.get_platillo_ingredintes, [platillo.id_platillos]);
                                    if (resultQueryPlatilloIngrediente.length > 0) {
                                        for (const ingrediente of resultQueryPlatilloIngrediente) {
                                            const resultQueryArticulo = await executeQuery(queries.get_articulo, [menu.restaurante, ingrediente.ingrediente]);
                                            if (resultQueryArticulo.length != 0) {
                                                platillo.ingredientes.push(new mArticulo(resultQueryArticulo[0]));
                                            }
                                        }
                                    }
                                    menu.platillos.push(platillo);
                                }
                            } else if (item.tipo === "B") {
                                const resultQueryBebida = await executeQuery(queries.get_articulo, [menu.restaurante, instancia.articulo]);
                                if (resultQueryBebida.length != 0) {
                                    menu.bebidas.push(new mArticulo(resultQueryBebida[0]));
                                }
                            } else {
                                const resultQueryArticulo = await executeQuery(queries.get_articulo, [menu.restaurante, instancia.articulo]);
                                if (resultQueryArticulo.length != 0) {
                                    menu.otros.push(new mArticulo(resultQueryArticulo[0]));
                                }
                            }
                        }
                        restauranteData.menu.push(menu);
                    }
                }
                return res.status(200).json({ messages: "", restaurante: restauranteData });
            } else {
                return res.status(404).json({ messages: "Restaurante no encontrado", restaurante: null });
            }
        } else {
            let getRestaurantes = [];
            resultRequest = await executeQuery(queries.get_restaurantes);
            if (resultRequest.length > 0) {
                for (const item of resultRequest) {
                    const restauranteData = new restaurante(item);
                    // Ejecutar consultas
                    const resultTelefono = await executeQuery(queries.get_telefono, [restauranteData.telefono]);
                    const resultDireccion = await executeQuery(queries.get_direccion, [restauranteData.direccion]);
                    if (typeof resultTelefono[0] != "undefined" && resultTelefono[0] != null) {
                        restauranteData.telefono = new telefonos(resultTelefono[0]);
                    }
                    if (typeof resultDireccion[0] != "undefined" && resultDireccion[0] != null) {
                        restauranteData.direccion = new direcciones(resultDireccion[0]);
                    }

                    const resultQueryGetMesas = await executeQuery(queries.get_mesas, [restauranteData.id_restaurante]);
                    if (typeof resultDireccion[0] != "undefined" && resultDireccion[0] != null) {
                        restauranteData.mesas = resultQueryGetMesas.map((item) => new mMesas(item));
                    }

                    const resultQueryGetMenu = await executeQuery(queries.get_menu_restaurante, [restauranteData.id_restaurante]);
                    if (resultQueryGetMenu.length > 0) {
                        const menus = resultQueryGetMenu.map((men) => new mMenu(men));
                        for (const menu of menus) {
                            const itemsMenu = await executeQuery(queries.get_menu_articulo, [menu.id_menu]);
                            menu.platillos = [];
                            menu.bebidas = [];
                            menu.otros = [];
                            for (const menuItem of itemsMenu) {
                                const instancia = new mMenuArticulos(menuItem);
                                if (menuItem.tipo === "P") {
                                    const resultQueryPlatillo = await executeQuery(queries.get_platillo, [instancia.articulo]);
                                    if (resultQueryPlatillo.length != 0) {
                                        const platillo = new mPlatillos(resultQueryPlatillo[0]);
                                        platillo.ingredientes = [];
                                        const resultQueryPlatilloIngrediente = await executeQuery(queries.get_platillo_ingredintes, [platillo.id_platillos]);
                                        if (resultQueryPlatilloIngrediente.length > 0) {
                                            for (const ingrediente of resultQueryPlatilloIngrediente) {
                                                const resultQueryArticulo = await executeQuery(queries.get_articulo, [menu.restaurante, ingrediente.ingrediente]);
                                                if (resultQueryArticulo.length != 0) {
                                                    platillo.ingredientes.push(new mArticulo(resultQueryArticulo[0]));
                                                }
                                            }
                                        }
                                        menu.platillos.push(platillo);
                                    }
                                } else if (menuItem.tipo === "B") {
                                    const resultQueryBebida = await executeQuery(queries.get_articulo, [menu.restaurante, instancia.articulo]);
                                    if (resultQueryBebida.length != 0) {
                                        menu.bebidas.push(new mArticulo(resultQueryBebida[0]));
                                    }
                                } else {
                                    const resultQueryArticulo = await executeQuery(queries.get_articulo, [menu.restaurante, instancia.articulo]);
                                    if (resultQueryArticulo.length != 0) {
                                        menu.otros.push(new mArticulo(resultQueryArticulo[0]));
                                    }
                                }
                            }
                            restauranteData.menu.push(menu);
                        }
                    }

                    getRestaurantes.push(restauranteData);
                }
                return res.status(200).json({ messages: "Restaurantes Registrados", restaurantes: getRestaurantes });
            } else {
                return res.status(404).json({ messages: "No hay registros existentes.", restaurante: null });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: "Error al ejecutar la consulta.", list: [], error: error });
    }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const post_restaurante = async (req, res) => {
    let connection = null;
    try {
        connection = await getConnection();
        if (connection == null) return res.status(400).send("Error del servidor");
        const mrestaurante = new restaurante(req.body);
        await connection.beginTransaction();
        const resultPostTelefono = await executeQueryTR(connection, queries.post_telefono, [mrestaurante.telefono.num_telefono_movil, mrestaurante.telefono.num_telefono_fijo]);
        mrestaurante.telefono.id_telefonico = resultPostTelefono.insertId;
        const resultPostDireccion = await executeQueryTR(connection, queries.post_direccion, [mrestaurante.direccion.provincia, mrestaurante.direccion.canton, mrestaurante.direccion.distrito, mrestaurante.direccion.direccion]);
        mrestaurante.direccion.id_direcciones = resultPostDireccion.insertId;
        const resultPostRestaurante = await executeQueryTR(connection, queries.post_restaurante, [mrestaurante.local, mrestaurante.nombre, mrestaurante.direccion.id_direcciones, mrestaurante.telefono.id_telefonico]);
        mrestaurante.id_restaurante = resultPostRestaurante.insertId;
        await connection.commit();
        return res.status(200).json({ messages: "Registro Exitoso", restaurante: mrestaurante });
    } catch (error) {
        console.log(error);
        if (connection) await connection.rollback();
        return res.status(400).json({ messages: "Error en la consulta post", error: error, restaurante: null });
    } finally {
        if (connection) connection.release(); // 🔹 Liberar conexión
    }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const put_restaurante = async (req, res) => {
    let connection = null;
    try {
        connection = await getConnection();
        const mrestaurante = new restaurante(req.body);
        await connection.beginTransaction();
        const resultPutTelefono = await executeQueryTR(connection, queries.update_telefono, [mrestaurante.telefono.num_telefono_movil, mrestaurante.telefono.num_telefono_fijo, mrestaurante.telefono.id_telefonico]);
        const resultPutDireccion = await executeQueryTR(connection, queries.update_direccion, [mrestaurante.direccion.provincia, mrestaurante.direccion.canton, mrestaurante.direccion.distrito, mrestaurante.direccion.direccion, mrestaurante.direccion.id_direcciones]);
        const resultPutRestaurante = await executeQueryTR(connection, queries.update_restaurante, [mrestaurante.local, mrestaurante.nombre, mrestaurante.direccion.id_direcciones, mrestaurante.telefono.id_telefonico, mrestaurante.id_restaurante]);
        await connection.commit();
        return res.status(200).json({ messages: "Actualizacion Exitosa", restaurante: mrestaurante });
    } catch (error) {
        console.log(error);
        if (connection) await connection.rollback();
        return res.status(400).json({ messages: "Error en la consulta put", error: error, restaurante: null });
    } finally {
        if (connection) connection.release(); // 🔹 Liberar conexión
    }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const delete_restaurante = async (req, res) => {
    try {
        const { id } = req.params;
        let resultRequest = await executeQuery(queries.get_restaurante, [id]);
        if (resultRequest.length == 0) return res.status(400).send("No se encontro el restaurante a eliminar");
        const restauranteData = new restaurante(resultRequest[0]);

        let resultDeleteTelefono = await executeQuery(queries.delete_telefono, [restauranteData.telefono]);
        if (resultDeleteTelefono.affectedRows == 0) {
            return res.status(400).json({ messages: "Error en la consulta delete", error: "No se encontro el registro de telefonos a eliminar", telefono: restauranteData.telefono });
        }

        let resultDeleteDireccion = await executeQuery(queries.delete_direccion, [restauranteData.direccion]);
        if (resultDeleteDireccion.affectedRows == 0) {
            return res.status(400).json({ messages: "Error en la consulta delete", error: "No se encontro el registro de direccion a eliminar", direccion: restauranteData.direccion });
        }

        let resultDeleteRestaurante = await executeQuery(queries.delete_restaurante, [restauranteData.id_restaurante]);
        if (resultDeleteRestaurante.affectedRows == 0) {
            return res.status(400).json({ messages: "Error en la consulta delete", error: "No se encontro el restaurante a eliminar", restaurante: null });
        }

        return res.status(200).json({ messages: "Registro Eliminado", error: "", restaurante: restauranteData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: "Error en la consulta delete", error: error, restaurante: null });
    }
};

//Mesas


/**
 * @param {Request} req
 * @param {Response} res
 */
export const get_mesa = async (req, res) => {
    try {
        const { id } = req.params;
        let resultRequest = await executeQuery(queries.get_mesa, [id]);
        if (resultRequest.length > 0) {
            const mesa = new mMesas(resultRequest[0]);
            return res.status(200).json({ messages: "", mesa: mesa });
        } else {
            return res.status(404).json({ messages: "No hay registros existentes.", mesas: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: "Error al ejecutar la consulta.", error: error });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const get_mesas = async (req, res) => {
    try {
        const { restaurante } = req.params;
        let resultRequest = await executeQuery(queries.get_mesas, [restaurante]);
        if (resultRequest.length > 0) {
            const mesas = resultRequest.map((item) => new mMesas(item));
            return res.status(200).json({ messages: "", mesas: mesas });
        } else {
            return res.status(404).json({ messages: "No hay registros existentes.", mesas: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: "Error al ejecutar la consulta.", error: error });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const post_mesa = async (req, res) => {
    try {
        const mmesa = new mMesas(req.body);
        const resultPostMesa = await executeQuery(queries.post_mesa, [mmesa.nombre, mmesa.estado, mmesa.restaurante]);
        if (resultPostMesa.affectedRows == 0) return res.status(400).json({ messages: "Error en la consulta post", error: "No se pudo registrar la mesa", mesa: null });
        mmesa.id_mesas = resultPostMesa.insertId;
        return res.status(200).json({ messages: "Registro Exitoso", mesa: mmesa });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: "Error en la consulta post", error: error, mesa: null });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const put_mesa = async (req, res) => {
    try {
        const mmesa = new mMesas(req.body);
        const resultPutMesa = await executeQuery(queries.update_mesa, [mmesa.nombre, mmesa.estado, mmesa.id_mesas, mmesa.restaurante]);
        if (resultPutMesa.affectedRows == 0) return res.status(400).json({ messages: "Error en la consulta put", error: "No se pudo actualizar la mesa", mesa: null });
        return res.status(200).json({ messages: "Actualizacion Exitosa", mesa: mmesa });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: "Error en la consulta put", error: error, mesa: null });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export const delete_mesa = async (req, res) => {
    try {
        const { id } = req.params;
        let resultRequest = await executeQuery(queries.get_mesa, [id]);
        if (resultRequest.length == 0) return res.status(400).send("No se encontro la mesa a eliminar");
        const mesaData = new mMesas(resultRequest[0]);
        let resultDeleteMesa = await executeQuery(queries.delete_mesa, [mesaData.id_mesas]);
        if (resultDeleteMesa.affectedRows == 0) return res.status(400).json({ messages: "Error en la consulta delete", error: "No se encontro el registro de mesa a eliminar", mesa: null });
        return res.status(200).json({ messages: "Registro Eliminado", error: "", mesa: null });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: "Error en la consulta delete", error: error, mesa: null });
    }
}