//Estes es el importe de las librerias
import assert from 'assert';
import { config } from 'dotenv';
import { connect } from 'http2';

config();

assert(process.env.PORT, "Puerto obligatorio");
assert(process.env.SQL_HOST, "Campo Host obligatorio");
assert(process.env.SQL_USER, " Campo User obligatorio");
assert(process.env.SQL_PASSWORD, "Campo Password obligatorio");
assert(process.env.SQL_DATABASE, "Campo Database obligatorio");

export default {
    port: process.env.PORT,
    sql: {
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        charset: 'utf8mb4', // usa este charset si hay emojis o caracteres especiales
    }
}