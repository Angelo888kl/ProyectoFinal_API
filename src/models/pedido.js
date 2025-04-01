/**
 * @typedef {Object} pedido
 * @property {number} id_pedido
 * @property {number} menu
 */

/**
 * Clase representativa de la tabla [pedido].
 */
export class pedido {
    /**
     * @param {pedido} obj - tipo de objeto representativo de la tabla [pedido].
     */
    constructor(obj) {
        if(obj) {
            this.id_pedido = obj.id_pedido;
            this.menu = obj.menu;
        } else {
            this.id_pedido = 0;
            this.menu = "";
        }
    }
}