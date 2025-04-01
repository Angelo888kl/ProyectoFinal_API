/**
 * @typedef {Object} menu
 * @property {number} id_menu
 * @property {string} nombre
 * @property {number} restaurante
 */

/**
 * Clase representativa de la tabla [menu].
 */
export class menu {
    /**
     * @param {menu} obj - tipo de objeto representativo de la tabla [menu].
     */
    constructor(obj) {
        if(obj) {
            this.id_menu = obj.id_menu;
            this.nombre = obj.nombre;
            this.restaurante = obj.restaurante;
        } else {
            this.id_menu = 0;
            this.nombre = "";
            this.restaurante = 0;
        }
    }
}