import sql from 'mysql2/promise';
import init from './init.js';
//Crecion de instancia de pool
const pool = sql.createPool(init.sql);

//Funcion de conexion
export async function getConnection(){
    let connection = null;
    try {
        connection = await pool.getConnection();
        // console.log(connection != null ? "Conexion exitosa":"Conexion fallida");
        return connection;
    } catch (error) {
        console.log("Error al conectar ", error);
        return connection;
    }
}

export async function executeQuery(query, params = []) {
    let connection = null;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(query, params)
        return rows;
    } catch (error) {
        console.log("Error al ejecuatar la query ", error);
        //Crea un evento de error, devulve el error.
        throw error;
    } finally {
        //Si la variable conexion es diferente a null librera la conexion
        if (connection) connection.release();
    }
}

export async function executeQueryTR(connectionTR, query, params = []) {
    let connection = null;
    try {
        connection = connectionTR;
        if(!connection) throw "Error en la conexion sql.";
        const [rows] = await connection.execute(query, params)
        return rows;
    } catch (error) {
        console.log("Error al ejecuatar la query ", error);
        //Crea un evento de error, devulve el error.
        throw error;
    }
}

export async function closeConnection() {
    try {
        pool.end();
        console.log("Conexion Pool terminada");
    } catch (error) {
        console.log(error);
    }
}
export const port = init.port;