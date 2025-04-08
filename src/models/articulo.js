/**
 * @typedef {Object} Articulo
 * @property {number} id_inventario
 * @property {number} restaurante
 * @property {string} articulo
 * @property {number} cantidad
 * @property {Date} fecha_caducidad
 * @property {string} tipo - I: Ingrediente, B: Bebida, O: Otro.
 */

const tipos = { I: 'I', B: 'B', O: 'O' };

/**
 * Clase representativa de la tabla [inventario].
 */
export class mArticulo {
    /**
     * @param { Articulo } obj - tipo de objeto representativo de la tabla [inventario].
     */
    constructor(obj) {
        if(obj) {
            this.id_articulo = obj.id_articulo
            this.restaurante = obj.restaurante;
            this.articulo = obj.articulo;
            this.cantidad = obj.cantidad;
            this.fecha_caducidad = obj.fecha_caducidad;
            this.tipo = tipos[obj.tipo.toUpperCase()] || 'O';
        } else {
            this.id_articulo = 0;
            this.restaurante = 0;
            this.articulo = '';
            this.cantidad = 0;
            this.fecha_caducidad = 0;
            this.tipo = 'O';
        }
    }
}