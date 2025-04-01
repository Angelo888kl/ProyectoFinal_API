/**
 * @typedef {Object} platillos
 * @property {number} id_platillos
 * @property {string} nombre
 */

/**
 * Clase representativa de la tabla [platillos].
 */
export class platillos {
    /**
     * @param {platillos} obj - tipo de objeto representativo de la tabla [platillo].
     */
    constructor(obj) {
        if(obj) {
            this.id_platillos = obj.id_platillos;
            this.nombre = obj.nombre;
        } else {
            this.id_platillos = 0;
            this.nombre = "";
        }
    }
}