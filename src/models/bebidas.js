/**
 * @typedef {Object} bebidas
 * @property {number} id_bebidas
 * @property {string} articulo
 */

/**
 * Clase representativa de la tabla [bebidas].
 */
export class bebidas {
    /**
     * @param {bebidas} obj - tipo de objeto representativo de la tabla [bebidas].
     */
    constructor(obj) {
        if(obj) {
            this.id_bebidas = obj.id_bebidas;
            this.articulo = obj.articulo;
        } else {
            this.id_bebidas = 0;
            this.articulo = '';
        }
    }
}