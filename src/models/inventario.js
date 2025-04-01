/**
 * @typedef {Object} inventario
 * @property {number} id_inventario
 * @property {string} articulo
 * @property {number} cantidad
 * @property {number} fecha_caducidad
 * @property {number} restaurante
 */

/**
 * Clase representativa de la tabla [inventario].
 */
export class inventario {
    /**
     * @param {inventario} obj - tipo de objeto representativo de la tabla [inventario].
     */
    constructor(obj) {
        if(obj) {
            this.id_inventario = obj.id_inventario
            this.articulo = obj.articulo;
            this.cantidad = obj.cantidad;
            this.fecha_caducidad = obj.fecha_caducidad;
            this.restaurante = obj.restaurante;
        } else {
            this.id_inventario = 0;
            this.articulo = '';
            this.cantidad = 0;
            this.fecha_caducidad = 0;
            this.restaurante = 0;
        }
    }
}