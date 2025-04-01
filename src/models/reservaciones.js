/**
 * @typedef {Object} reservacion
 * @property {number} id_reservaciones
 * @property {number} mesa
 * @property {string} cliente
 * @property {number} duracion
 * @property {number} fecha
 */

/**
 * Clase representativa de la tabla [reservaciones].
 */
export class reservacion {
    /**
     * @param {reservacion} obj - tipo de objeto representativo de la tabla [resrvacion].
     */
    constructor(obj) {
        if(obj) {
            this.id_reservaciones = obj.id_reservaciones;
            this.mesa = obj.mesa;
            this.cliente = obj.cliente;
            this.duracion = obj.duracion;
            this.fecha = obj.fecha;
        } else {
            this.id_reservaciones = 0;
            this.mesa = 0;
            this.cliente = "";
            this.duracion = 0;
            this.fecha = 0/0/0;
        }
    }
}