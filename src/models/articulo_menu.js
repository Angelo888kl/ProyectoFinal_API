/**
 * @typedef {Object} articulo_menu
 * @property {number} id_articulo_menu
 * @property {string} menu
 * @property {string} bebida
 * @property {number} platillo
 */

/**
 * Clase representativa de la tabla [articulo_menu].
 */
export class articulo_menu {
    /**
     * @param {articulo_menu} obj - tipo de objeto representativo de la tabla [articulo_menu].
     */
    constructor(obj) {
        if(obj) {
            this.id_articulo_menu = obj.id_articulo_menu;
            this.menu = obj.menu;
            this.bebida = obj.bebida;
            this.platillo = obj.platillo;
        } else {
            this.id_articulo_menu = 0;
            this.menu = '';
            this.bebida = '';
            this.platillo = 0;
        }
    }
}