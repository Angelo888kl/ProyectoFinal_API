/**
 * @typedef {Object} ingredientes
 * @property {number} id_ingredientes
 * @property {string} articulo
 */

/**
 * Clase representativa de la tabla [ingredintes].
 */
export class ingredientes {
    /**
     * @param {ingredientes} obj - tipo de objeto representativo de la tabla [ingredientes].
     */
    constructor(obj) {
        if(obj) {
            this.id_ingredientes = obj.id_ingredientes;
            this.articulo = obj.articulo;
        } else {
            this.id_ingredientes = 0;
            this.articulo = '';
        }
    }
}