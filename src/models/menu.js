import { mPlatillos } from "./platillo.js";
import { mArticulo } from "./articulo.js";

/**
 * @typedef {Object} Menu
 * @property {number} id_menu
 * @property {number} restaurante
 * @property {string} nombre
 */

/**
 * Clase representativa de la tabla [menu].
 */
export class mMenu {
    /**
     * @param {Menu} obj - tipo de objeto representativo de la tabla [menu].
     */
    constructor(obj) {
        if(obj) {
            this.id_menu = obj.id_menu;
            this.restaurante = obj.restaurante;
            this.nombre = obj.nombre;
            this.platillos = [];
            this.bebidas = [];
            this.otros = [];
        } else {
            this.id_menu = 0;
            this.restaurante = 0;
            this.nombre = "";
            this.platillos = [];
            this.otros = [];
        }
    }
}