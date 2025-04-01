/**
 * @typedef {Object} pedidos_articulo
 * @property {string} pedido
 * @property {string} articulo
 * @property {string} tipo	
 */

/**
 * Clase representativa de la tabla [pedidos_articulo].
 */
export class pedidos_articulo {
    /**
     * @param {pedidos_articulo} obj - tipo de objeto representativo de la tabla [pedidos_articulo].
     */
    constructor(obj) {
        if(obj) {
            this.pedido = obj.pedido;
            this.articulo = obj.articulo;
            this.tipo = obj.tipo;
        } else {
            this.pedido = "";
            this.articulo = "";
            this.tipo = "";
        }
    }
}