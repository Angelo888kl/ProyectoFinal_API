import { getConnection, executeQuery, executeQueryTR, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { mClientes } from "../models/clientes.js";
import { telefonos } from "../models/telefonos.js";
import { direcciones } from "../models/dirrecciones.js";


export const get_clientes = async (req, res) => {
    const { id } = req.params;
    try {
        let queryResult1 = await executeQuery(queries.get_cliente_by_restaurante, [id]);
        if (queryResult1.length === 0) return res.status(404).json({ message: "No se encontraron clientes" });
        //
        const listClientes = queryResult1.map((cliente) => new mClientes(cliente));
        for (const cliente of listClientes) {
            const queryResult2 = await executeQuery(queries.get_telefono, [cliente.telefono]);
            if (queryResult2.length > 0) {
                cliente.telefono = new telefonos(queryResult2[0]);
            }
            const queryResult3 = await executeQuery(queries.get_direccion, [cliente.direccion]);
            if (queryResult3.length > 0) {
                cliente.direccion = new direcciones(queryResult3[0]);
            }
        }
        return res.status(200).json({ message: "", clientes: listClientes });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error: error });
    }
}

export const get_cliente = async (req, res) => {
    const { cedula } = req.params;
    try {
        let queryResult1 = await executeQuery(queries.get_cliente_by_cedula, [cedula]);
        if (queryResult1.length === 0) return res.status(404).json({ message: "No se encontraron clientes" });
        const cliente = new mClientes(queryResult1[0]);
        const queryResult2 = await executeQuery(queries.get_telefono, [cliente.telefono]);
        if (queryResult2.length > 0) {
            cliente.telefono = new telefonos(queryResult2[0]);
        }
        const queryResult3 = await executeQuery(queries.get_direccion, [cliente.direccion]);
        if (queryResult3.length > 0) {
            cliente.direccion = new direcciones(queryResult3[0]);
        }
        return res.status(200).json({ message: "", clientes: cliente });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", error: error });
    }
}

export const post_clientes = async (req, res) => {
    let connection = null;
    try {
        const mclientes = new mClientes(req.body);
        connection = await getConnection();
        if (connection == null) return res.status(400).send("Error del servidor");
        await connection.beginTransaction();
        const resultPostTelefono = await executeQueryTR(connection, queries.post_telefono, [mclientes.telefono.num_telefono_movil, mclientes.telefono.num_telefono_fijo]);
        mclientes.telefono.id_telefonico = resultPostTelefono.insertId;
        const resultPostDireccion = await executeQueryTR(connection, queries.post_direccion, [mclientes.direccion.provincia, mclientes.direccion.canton, mclientes.direccion.distrito, mclientes.direccion.direccion]);
        mclientes.direccion.id_direcciones = resultPostDireccion.insertId;
        const resultPostCliente = await executeQueryTR(connection, queries.post_cliente, [mclientes.restaurante, mclientes.cedula, mclientes.nombre, mclientes.direccion.id_direcciones, mclientes.telefono.id_telefonico]);
        mclientes.id_clientes = resultPostCliente.insertId;
        await connection.commit();
        return res.status(200).json({ messages: "Registro Exitoso", cliente: mclientes });
    } catch (error) {
        console.log(error);
        if (connection) await connection.rollback();
        return res.status(400).json({ messages: "Error en la consulta", cliente: null, error: error });
    } finally {
        if (connection) connection.release(); // 🔹 Liberar conexión
    }
};

export const put_clientes = async (req, res) => {
    let connection = null;
    try {
        const mcliente = new mClientes(req.body);
        connection = await getConnection();
        await connection.beginTransaction();
        const resultPutTelefono = await executeQueryTR(connection, queries.update_telefono, [mcliente.telefono.num_telefono_movil, mcliente.telefono.num_telefono_fijo, mcliente.telefono.id_telefonico]);
        const resultPutDireccion = await executeQueryTR(connection, queries.update_direccion, [mcliente.direccion.provincia, mcliente.direccion.canton, mcliente.direccion.distrito, mcliente.direccion.direccion, mcliente.direccion.id_direcciones]);
        const resultPutClientes = await executeQueryTR(connection, queries.update_cliente, [mcliente.restaurante, mcliente.cedula, mcliente.nombre, mcliente.direccion.id_direcciones, mcliente.telefono.id_telefonico, mcliente.id_clientes]);
        await connection.commit();
        return res.status(200).json({ messages: "Actualizacion Exitosa", cliente: mcliente });
    } catch (error) {
        console.log(error);
        if (connection) await connection.rollback();
        return res.status(400).json({ messages: "Error en la consulta",  cliente: null, error: error });
    } finally {
        if (connection) connection.release(); // 🔹 Liberar conexión
    }
};

export const delete_clientes = async (req, res) => {
    try {
        const { id } = req.params;
        
        let resultRequest = await executeQuery(queries.get_cliente, [id]);
        if (resultRequest.length == 0) return res.status(400).send("No se encontro el cliente a eliminar");
        const cliente = new mClientes(resultRequest[0]);
        
        let resultDeleteTelefono = await executeQuery(queries.delete_telefono, [cliente.telefono]);
        if (resultDeleteTelefono.affectedRows == 0) {
            return res.status(400).json({ messages: "Error en la consulta delete", error: "No se encontro el registro de telefonos a eliminar", telefono: restauranteData.telefono });
        }
        
        let resultDeleteDireccion = await executeQuery(queries.delete_direccion, [cliente.direccion]);
        if (resultDeleteDireccion.affectedRows == 0) {
            return res.status(400).json({ messages: "Error en la consulta delete", error: "No se encontro el registro de direccion a eliminar", direccion: restauranteData.direccion });
        }
        
        let resultDeleteCliente = await executeQuery(queries.delete_cliente, [cliente.id_clientes]);
        if (resultDeleteCliente.affectedRows == 0) {
            return res.status(400).json({ messages: "Error en la consulta delete", error: "No se encontro el cliente a eliminar", restaurante: null });
        }

        return res.status(200).json({ message: "Cliente eliminado", cliente: cliente });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en la consulta", error: error });
    }
};