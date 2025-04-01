/**
 * @typedef {Object} ordenes
 * @property {number} id_ordenes
 * @property {string} clientes
 * @property {number} pedido
 */

/**
 * Clase representativa de la tabla [ordenes].
 */
export class ordenes {
    /**
     * @param {ordenes} obj - tipo de objeto representativo de la tabla [ordenes].
     */
    constructor(obj) {
        if(obj) {
            this.id_ordenes = obj.id_ordenes;
            this.clientes = obj.clientes;
            this.pedido = obj.pedido;
        } else {
            this.id_ordenes = 0;
            this.clientes = "";
            this.pedido = "";
        }
    }
}