import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { mReservacion } from "../models/reservaciones.js";
import { restaurante } from "../models/restaurante.js";
import { telefonos } from "../models/telefonos.js";
import { direcciones } from "../models/dirrecciones.js";
import { mClientes } from "../models/clientes.js";
import { mMesas } from "../models/mesas.js";

export const get_reservacion = async (req, res) => {
    try {
        const { id } = req.params;
        const resultQuery = await executeQuery(queries.get_reservacion, [id]);
        if (resultQuery.length == 0) return res.status(200).json({ message: "No hay reservaciones", reservaciones: null });
        for (const item of resultQuery) {
            const reservacion = new mReservacion(item);
            const resultQuery2 = await executeQuery(queries.get_restaurante, [reservacion.restaurante]);
            if (resultQuery2.length > 0) {
                const mrestaurante = new restaurante(resultQuery2[0]);
                const resultTelefono = await executeQuery(queries.get_telefono, [mrestaurante.telefono]);
                mrestaurante.telefono = new telefonos(resultTelefono[0]);
                const resultDireccion = await executeQuery(queries.get_direccion, [mrestaurante.direccion]);
                mrestaurante.direccion = new direcciones(resultDireccion[0]);
                item.restaurante = mrestaurante;
            }
            const resultQuery3 = await executeQuery(queries.get_cliente, [reservacion.cliente]);
            if (resultQuery3.length > 0) {
                const cliente = new mClientes(resultQuery3[0]);
                const resultTelefono = await executeQuery(queries.get_telefono, [cliente.telefono]);
                cliente.telefono = new telefonos(resultTelefono[0]);
                const resultDireccion = await executeQuery(queries.get_direccion, [cliente.direccion]);
                cliente.direccion = new direcciones(resultDireccion[0]);
                item.cliente = cliente;
            }
            const resultQuery4 = await executeQuery(queries.get_mesa, [reservacion.mesa]);
            if (resultQuery4.length > 0) {
                const mesa = new mMesas(resultQuery4[0]);
                item.mesa = mesa;
            }
        }
        return res.status(200).json({ message: "Reservacion encontrada", reservacion: resultQuery });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", reservaciones: null, error: error });
    }
}

export const get_reservaciones = async (req, res) => {
    try {
        const { id } = req.params;
        const resultQuery = await executeQuery(queries.get_reservaciones, [id]);
        if (resultQuery.length == 0) return res.status(200).json({ message: "No hay reservaciones", reservaciones: null });
        for (const item of resultQuery) {
            const reservacion = new mReservacion(item);
            const resultQuery2 = await executeQuery(queries.get_restaurante, [reservacion.restaurante]);
            if (resultQuery2.length > 0) {
                const mrestaurante = new restaurante(resultQuery2[0]);
                const resultTelefono = await executeQuery(queries.get_telefono, [mrestaurante.telefono]);
                mrestaurante.telefono = new telefonos(resultTelefono[0]);
                const resultDireccion = await executeQuery(queries.get_direccion, [mrestaurante.direccion]);
                mrestaurante.direccion = new direcciones(resultDireccion[0]);
                item.restaurante = mrestaurante;
            }
            const resultQuery3 = await executeQuery(queries.get_cliente, [reservacion.cliente]);
            if (resultQuery3.length > 0) {
                const cliente = new mClientes(resultQuery3[0]);
                const resultTelefono = await executeQuery(queries.get_telefono, [cliente.telefono]);
                cliente.telefono = new telefonos(resultTelefono[0]);
                const resultDireccion = await executeQuery(queries.get_direccion, [cliente.direccion]);
                cliente.direccion = new direcciones(resultDireccion[0]);
                item.cliente = cliente;
            }
            const resultQuery4 = await executeQuery(queries.get_mesa, [reservacion.mesa]);
            if (resultQuery4.length > 0) {
                const mesa = new mMesas(resultQuery4[0]);
                item.mesa = mesa;
            }
        }
        return res.status(200).json({ message: "Reservacion encontrada", reservaciones: resultQuery });
    } catch (error) {
        console.log(error);

    }
}

export const post_reservacion = async (req, res) => {
    try {
        const reservacion = new mReservacion(req.body);
        let resultQuery = await executeQuery(queries.post_reservacion, [reservacion.restaurante, reservacion.cliente, reservacion.mesa, reservacion.duracion, reservacion.fecha]);
        if (resultQuery.affectedRows == 0) return res.status(200).send("No se pudo insertar la reservacion");
        reservacion.id_reservaciones = resultQuery.insertId;

        const ahora = new Date();
        const fecha_reservacion = new Date(reservacion.fecha);
        const mismo_dia = (fecha_reservacion.getDay() === ahora.getDay() && fecha_reservacion.getMonth() === ahora.getMonth() && fecha_reservacion.getFullYear() === ahora.getFullYear());
        if (mismo_dia) {
            let resultQuerryMesaEstado = await executeQuery(queries.update_mesa_estado, ['R', reservacion.mesa, reservacion.restaurante]);
            if (resultQuerryMesaEstado.affectedRows == 0) return res.status(200).send("No se pudo actualizar la mesa");
        }

        const resultQuery2 = await executeQuery(queries.get_restaurante, [reservacion.restaurante]);
        if (resultQuery2.length > 0) {
            const mrestaurante = new restaurante(resultQuery2[0]);
            const resultTelefono = await executeQuery(queries.get_telefono, [mrestaurante.telefono]);
            mrestaurante.telefono = new telefonos(resultTelefono[0]);
            const resultDireccion = await executeQuery(queries.get_direccion, [mrestaurante.direccion]);
            mrestaurante.direccion = new direcciones(resultDireccion[0]);
            reservacion.restaurante = mrestaurante;
        }
        const resultQuery3 = await executeQuery(queries.get_cliente, [reservacion.cliente]);
        if (resultQuery3.length > 0) {
            const cliente = new mClientes(resultQuery3[0]);
            const resultTelefono = await executeQuery(queries.get_telefono, [cliente.telefono]);
            cliente.telefono = new telefonos(resultTelefono[0]);
            const resultDireccion = await executeQuery(queries.get_direccion, [cliente.direccion]);
            cliente.direccion = new direcciones(resultDireccion[0]);
            reservacion.cliente = cliente;
        }
        const resultQuery4 = await executeQuery(queries.get_mesa, [reservacion.mesa]);
        if (resultQuery4.length > 0) {
            const mesa = new mMesas(resultQuery4[0]);
            reservacion.mesa = mesa;
        }
        return res.status(200).json({ message: "Reservacion insertada", reservacion: reservacion });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", reservacion: null, error: error });
    }
};

export const put_reservacion = async (req, res) => {
    try {
        const reservacion = new mReservacion(req.body);
        const resultQuery1 = await executeQuery(queries.get_reservacion, [reservacion.id_reservaciones]);
        if (resultQuery1.length == 0) return res.status(200).send("No se encontro la reservacion a actualizar");
        const oldReservacion = new mReservacion(resultQuery1[0]);
        let resultQuery2 = await executeQuery(queries.update_reservacion, [reservacion.restaurante, reservacion.cliente, reservacion.mesa, reservacion.duracion, reservacion.fecha, reservacion.id_reservaciones]);
        if (resultQuery2.affectedRows == 0) return res.status(200).send("No se pudo actualizar la reservacion");
        
        const ahora = new Date();
        const fecha_reservacion = new Date(reservacion.fecha);
        const treinta_minutos = 30 * 60 * 1000; // 30 minutos en milisegundos
        const mismo_dia = (fecha_reservacion.getDate() === ahora.getDate() && fecha_reservacion.getMonth() === ahora.getMonth() && fecha_reservacion.getFullYear() === ahora.getFullYear());
        if (mismo_dia) {
            let resultQuerryMesaEstado = await executeQuery(queries.update_mesa_estado, ['R', reservacion.mesa, reservacion.restaurante]);
            if (resultQuerryMesaEstado.affectedRows == 0) return res.status(200).send("No se pudo actualizar la mesa");
        }

        if (fecha_reservacion >= ahora && fecha_reservacion <= (ahora + treinta_minutos)) {
            let resultQuerryMesaEstado = await executeQuery(queries.update_mesa_estado, ['L', reservacion.mesa, reservacion.restaurante]);
            if (resultQuerryMesaEstado.affectedRows == 0) return res.status(200).send("No se pudo actualizar la mesa");
        }

        if(reservacion.restaurante != oldReservacion.restaurante){
            const resultQuery3 = await executeQuery(queries.get_restaurante, [reservacion.restaurante]);
            if (resultQuery3.length > 0) {
                const mrestaurante = new restaurante(resultQuery3[0]);
                const resultTelefono = await executeQuery(queries.get_telefono, [mrestaurante.telefono]);
                mrestaurante.telefono = new telefonos(resultTelefono[0]);
                const resultDireccion = await executeQuery(queries.get_direccion, [mrestaurante.direccion]);
                mrestaurante.direccion = new direcciones(resultDireccion[0]);
                reservacion.restaurante = mrestaurante;
            }            
        }
        if(reservacion.cliente != oldReservacion.cliente){
            const resultQuery4 = await executeQuery(queries.get_cliente, [reservacion.cliente]);
            if (resultQuery4.length > 0) {
                const cliente = new mClientes(resultQuery4[0]);
                const resultTelefono = await executeQuery(queries.get_telefono, [cliente.telefono]);
                cliente.telefono = new telefonos(resultTelefono[0]);
                const resultDireccion = await executeQuery(queries.get_direccion, [cliente.direccion]);
                cliente.direccion = new direcciones(resultDireccion[0]);
                reservacion.cliente = cliente;
            }            
        }
        if(reservacion.mesa != oldReservacion.mesa){
            const resultQuery5 = await executeQuery(queries.get_mesa, [reservacion.mesa]);
            if (resultQuery5.length > 0) {
                const mesa = new mMesas(resultQuery5[0]);
                reservacion.mesa = mesa;
            }            
        }
        return res.status(200).json({ message: "Reservacion actualizado.", reservacion: reservacion });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", reservacion: null, error: error });
    }
};

export const delete_reservacion = async (req, res) => {
    try {
        const { id } = req.params;
        const resultQuery1 = await executeQuery(queries.get_reservacion, [id]);
        if (resultQuery1.length == 0) return res.status(200).send("No se encontro la reservacion a actualizar");
        const reservacion = new mReservacion(resultQuery1[0]);

        const ahora = new Date();
        const fecha_reservacion = new Date(reservacion.fecha);
        const mismo_dia = (fecha_reservacion.getDate() === ahora.getDate() && fecha_reservacion.getMonth() === ahora.getMonth() && fecha_reservacion.getFullYear() === ahora.getFullYear());
        if (mismo_dia) {
            let resultQuerryMesaEstado = await executeQuery(queries.update_mesa_estado, ['L', reservacion.mesa, reservacion.restaurante]);
            if (resultQuerryMesaEstado.affectedRows == 0) return res.status(200).send("No se pudo actualizar la mesa");
        }

        const resultQuery3 = await executeQuery(queries.delete_reservacion, [id]);
        if (resultQuery3.affectedRows == 0) return res.status(200).send("No se pudo eliminar la reservacion");

        return res.status(200).json({ message: "Reservacion eliminada", reservacion: reservacion });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", reservacion: null, error: error });
    }
};