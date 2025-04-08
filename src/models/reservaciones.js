/**
 * @typedef {Object} Reservacion
 * @property {number} id_reservaciones
 * @property {number} restaurante
 * @property {number} mesa
 * @property {number} cliente
 * @property {string} duracion
 * @property {Date} fecha
 */

/**
 * Clase representativa de la tabla [reservaciones].
 */
export class mReservacion {
    /**
     * @param { Reservacion } obj - tipo de objeto representativo de la tabla [resrvacion].
     */
    constructor(obj) {
        if(obj) {
            this.id_reservaciones = obj.id_reservaciones;
            this.restaurante = obj.restaurante;
            this.mesa = obj.mesa;
            this.cliente = obj.cliente;
            this.duracion = obj.duracion;
            this.fecha = obj.fecha;
        } else {
            this.id_reservaciones = 0;
            this.restaurante = 0;
            this.mesa = 0;
            this.cliente = 0;
            this.duracion = Date.hours(0).toString() + ":" + Date.minutes(0).toString() + ":" + Date.seconds(0).toString();
            this.fecha = Date.now();
        }
    }
}