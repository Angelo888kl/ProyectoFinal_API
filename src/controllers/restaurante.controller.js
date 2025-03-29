import { getConnection, executeQuery, executeQueryTR, closeConnection } from '../configurations/index.js';
import { quieries } from '../configurations/index.js';

//importe de clases
import { restaurante } from '../models/restaurante.js'

/**
 * @param {Request} req
 * @param {Response} res
 */
export  const get = async(req, res) => {
    try {
        const {id} = req.params;
        let result = null;
        if(id > 0){
            result = await executeQuery(quieries.get_restaurante, [id]);
        }else{
            result = await executeQuery(quieries.get_restaurantes);
        }
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}

export  const post = async(req, res) => {
    let connection = null;
    try {
        connection = await getConnection();
        if(connection == null) return res.status(400).send("Error del servidor");
        const mrestaurante = new restaurante(req.body);
        await connection.beginTransaction();
        const resultPostTelefono = await executeQueryTR(connection, quieries.post_telefono, Object.values(mrestaurante.telefono));
        mrestaurante.telefono.id_telefonico = resultPostTelefono.insertId;
        const resultPostDireccion = await executeQueryTR(connection, quieries.post_direccion, Object.values(mrestaurante.direccion));
        mrestaurante.direccion.id_direcciones = resultPostDireccion.insertId;
        const resultPostRestaurante = await executeQueryTR(connection, quieries.post_restaurante, [mrestaurante.id_restaurante, mrestaurante.local, mrestaurante.nombre, mrestaurante.direccion.id_direcciones, mrestaurante.telefono.id_telefonico]);
        mrestaurante.id_restaurante = resultPostRestaurante.insertId;
        await connection.commit();
        const result = JSON.stringify({messages: "Registro Exitoso", restaurante: mrestaurante})
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if(connection) await connection.rollback();
        const result = JSON.stringify({messages: "Registro Exitoso", restaurante: mrestaurante});
        return res.status(400).send(error);
    } finally {
        if (connection) connection.release(); // 🔹 Liberar conexión
    }
}

export  const put = async(req, res) => {
    let connection = null;
    try {
        connection = await getConnection();
        const mrestaurante = new restaurante(req.body);

        let result = await executeQuery(quieries.update_restaurante, [local,nombre,direccion,telefono,id_restaurante]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}

export  const delete_restaurante = async(req, res) => {
    try {
        const {id} = req.params;
        let result = await executeQuery(quieries.delete_restaurante, [id]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}





export  const post_direccion = async(req, res) => {
    try {
        const {direccion} = req.body;
        let result = await executeQuery(quieries.post_direccion, [direccion]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}

export  const put_direccion = async(req, res) => {
    try {
        const {direccion} = req.body;
        let result = await executeQuery(quieries.update_direccion, [direccion]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}

export  const delete_direccion = async(req, res) => {
    try {
        const {direccion} = req.params;
        let result = await executeQuery(quieries.delete_direccion, [direccion]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}




export  const post_telefono = async(req, res) => {
    try {
        const {telefono} = req.body;
        let result = await executeQuery(quieries.post_telefono, [telefono]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}

export  const put_telefono = async(req, res) => {
    try {
        const {telefono} = req.body;
        let result = await executeQuery(quieries.update_telefono, [telefono]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}

export  const delete_telefono = async(req, res) => {
    try {
        const {telefono} = req.params;
        let result = await executeQuery(quieries.delete_telefono, [telefono]);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error en consulta");
    }
}

