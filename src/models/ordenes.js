/**
 * @typedef {Object} Ordenes
 * @property {number} id_orden
 * @property {number} restaurante
 * @property {number} mesa
 * @property {number} cliente
 * @property {Date} fecha
 * @property {string} estado
 */

// P - Progreso, C - Cancelada, T - Terminada
const estado = { P: 'P', C: 'C', T: 'T' };

/**
 * Clase representativa de la tabla [ordenes].
 */
export class mOrdenes {
    /**
     * @param { Ordenes } obj - tipo de objeto representativo de la tabla [ordenes].
     */
    constructor(obj) {
        if(obj) {
            this.id_orden = obj.id_orden;
            this.restaurante = obj.restaurante;
            this.mesa = obj.mesa;
            this.cliente = obj.cliente;
            this.fecha = obj.fecha;
            this.estado = estado[obj.estado] || 'A';
            this.articulos = [];
        } else {
            this.id_orden = 0;
            this.restaurante = 0;
            this.mesa = 0;
            this.cliente = 0;
            this.fecha = new Date();
            this.estado = 'A';
            this.articulos = [];
        }
    }
}