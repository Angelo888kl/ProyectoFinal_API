import { mArticulo } from "./articulo.js";
/**
 * @typedef {Object} Platillos
 * @property {number} id_platillos
 * @property {string} nombre
 * @property { Array<mArticulo> } ingredientes
 */

/**
 * Clase representativa de la tabla [platillos].
 */
export class mPlatillos {
    /**
     * @param {Platillos} obj - tipo de objeto representativo de la tabla [platillo].
     */
    constructor(obj) {
        if(obj) {
            this.id_platillos = obj.id_platillos;
            this.nombre = obj.nombre;
            this.ingredientes = obj.ingredientes;
        } else {
            this.id_platillos = 0;
            this.nombre = "";
            this.ingredientes = [];
        }
    }
}
