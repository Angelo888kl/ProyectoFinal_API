import { getConnection, executeQuery, executeQueryTR, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { restaurante } from "../models/restaurante.js";
import { telefonos } from "../models/telefonos.js";
import { direcciones } from "../models/dirrecciones.js";

/**
 * @param {Request} req
 * @param {Response} res
 */
export const get_restaurante = async (req, res) => {
    try {
        const { id } = req.params;
        let resultRequest = null;
        let getRestaurantes = [];
        if (id > 0) {
            resultRequest = await executeQuery(queries.get_restaurante, [id]);
            const restauranteData = new restaurante(resultRequest[0]);
            const resultTelefono = await executeQuery(queries.get_telefono, [
                restauranteData.telefono,
            ]);
            restauranteData.telefono = new telefonos(resultTelefono[0]);
            const resultDireccion = await executeQuery(queries.get_direccion, [
                restauranteData.direccion,
            ]);
            restauranteData.direccion = new direcciones(resultDireccion[0]);
            getRestaurantes.push(restauranteData);
        } else {
            resultRequest = await executeQuery(queries.get_restaurantes);
            await Promise.all(
                resultRequest.map(async (item) => {
                    const restauranteData = new restaurante(item);
                    // Ejecutar consultas
                    const resultTelefono = await executeQuery(queries.get_telefono, [restauranteData.telefono]);
                    const resultDireccion = await executeQuery(queries.get_direccion, [restauranteData.direccion]);
                    if (typeof resultTelefono[0] != "undefined" && resultTelefono[0] != null) {
                        item.telefono = new telefonos(resultTelefono[0]);
                    }
                    if (typeof resultDireccion[0] != "undefined" && resultDireccion[0] != null) {
                        item.direccion = new direcciones(resultDireccion[0]);
                    }
                })
            );
            // getRestaurantes.push(new restaurante(result));
            getRestaurantes = await resultRequest;
        }
        console.log(resultRequest);
        const result = JSON.stringify({
            messages: "Restaurantes Registrados",
            restaurantes: getRestaurantes,
        });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
};

export const post_restaurante = async (req, res) => {
    let connection = null;
    try {
        connection = await getConnection();
        if (connection == null) return res.status(400).send("Error del servidor");
        const mrestaurante = new restaurante(req.body);
        await connection.beginTransaction();
        const resultPostTelefono = await executeQueryTR(connection, queries.post_telefono, Object.values(mrestaurante.telefono));
        mrestaurante.telefono.id_telefonico = resultPostTelefono.insertId;
        const resultPostDireccion = await executeQueryTR(connection, queries.post_direccion, Object.values(mrestaurante.direccion));
        mrestaurante.direccion.id_direcciones = resultPostDireccion.insertId;
        const resultPostRestaurante = await executeQueryTR(connection, queries.post_restaurante, [mrestaurante.id_restaurante, mrestaurante.local, mrestaurante.nombre, mrestaurante.direccion.id_direcciones, mrestaurante.telefono.id_telefonico]);
        mrestaurante.id_restaurante = resultPostRestaurante.insertId;
        await connection.commit();
        const result = JSON.stringify({ messages: "Registro Exitoso", restaurante: mrestaurante });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (connection) await connection.rollback();
        const result = JSON.stringify({
            messages: "Error en la consulta post",
            error: error,
            restaurante: null,
        });
        return res.status(400).send(result);
    } finally {
        if (connection) connection.release(); // 🔹 Liberar conexión
    }
};

export const put_restaurante = async (req, res) => {
    let connection = null;
    try {
        connection = await getConnection();
        const mrestaurante = new restaurante(req.body);
        await connection.beginTransaction();
        const resultPostTelefono = await executeQueryTR(connection, queries.update_telefono, [mrestaurante.telefono.num_telefono_movil, mrestaurante.telefono.num_telefono_fijo, mrestaurante.telefono.id_telefonico]);
        const resultPostDireccion = await executeQueryTR(connection, queries.update_direccion, [mrestaurante.direccion.provincia, mrestaurante.direccion.canton, mrestaurante.direccion.distrito, mrestaurante.direccion.direccion, mrestaurante.direccion.id_direcciones]);
        const resultPostRestaurante = await executeQueryTR(connection, queries.update_restaurante, [mrestaurante.local, mrestaurante.nombre, mrestaurante.direccion.id_direcciones, mrestaurante.telefono.id_telefonico, mrestaurante.id_restaurante]);
        await connection.commit();
        const result = JSON.stringify({
            messages: "Actualizacion Exitosa",
            restaurante: mrestaurante,
        });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (connection) await connection.rollback();
        const result = JSON.stringify({
            messages: "Error en la consulta put",
            error: error,
            restaurante: null,
        });
        return res.status(400).send(result);
    } finally {
        if (connection) connection.release(); // 🔹 Liberar conexión
    }
};

export const delete_restaurante = async (req, res) => {
    try {
        const { id } = req.params;
        let resultRequest = await executeQuery(queries.get_restaurante, [id]);
        if (resultRequest.length == 0) return res.status(400).send("No se encontro el restaurante a eliminar");
        const restauranteData = new restaurante(resultRequest[0]);

        let resultDeleteTelefono = await executeQuery(queries.delete_telefono, [restauranteData.telefono]);
        if (resultDeleteTelefono.affectedRows == 0) {
            const resultM = JSON.stringify({messages: "Error en la consulta delete", error: "No se encontro el registro de telefonos a eliminar", restaurante: null});
            return res.status(400).send(resultM);
        }

        let resultDeleteDireccion = await executeQuery(queries.delete_direccion, [restauranteData.direccion]);
        if (resultDeleteDireccion.affectedRows == 0) {
            const resultM = JSON.stringify({messages: "Error en la consulta delete", error: "No se encontro el registro de direccion a eliminar", restaurante: null});
            return res.status(400).send(resultM);
        }

        let resultDeleteRestaurante = await executeQuery(queries.delete_restaurante, [restauranteData.id_restaurante]);
        if (resultDeleteRestaurante.affectedRows == 0) {
            const resultM = JSON.stringify({messages: "Error en la consulta delete", error: "No se encontro el restaurante a eliminar", restaurante: null});
            return res.status(400).send(resultM);
        }

        const resultM = JSON.stringify({messages: "Registro Eliminado", error: "", restaurante: null});
        return res.status(200).send(JSON.stringify(resultM));
    } catch (error) {
        console.log(error);
        const resultM = JSON.stringify({messages: "Error en la consulta delete", error: error, restaurante: null});
        return res.status(400).send(resultM);
    }
};

