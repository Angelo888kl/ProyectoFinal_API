import { mArticulo } from './articulo.js';
/**
 * @typedef {Object} MenuArticulos
 * @property {number} id_menu_articulos
 * @property {number} menu
 * @property {number} articulo
 * @property {string} tipo - I: Ingrediente, B: Bebida.
 */

// P = Platillo, I = Ingrediente, B = Bebidas, O = Otros.
const tipos = { P: 'P', I: 'I', B: 'B', O: 'O' };

/**
 * Clase representativa de la tabla [articulo_menu].
 */
export class mMenuArticulos {
    /**
     * @param {MenuArticulos} obj - tipo de objeto representativo de la tabla [articulo_menu].
     */
    constructor(obj) {
        if(obj) {
            this.id_menu_articulos = obj.id_menu_articulos;
            this.menu = obj.menu;
            this.articulo = obj.articulo;
            this.tipo = tipos[obj.tipo.toUpperCase()];
        } else {
            this.id_menu_articulos = 0;
            this.menu = 0;
            this.articulo = 0;
            this.tipo = 'I';
        }
    }
}