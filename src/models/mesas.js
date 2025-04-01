/**
 * @typedef {Object} mesas
 * @property {number} id_mesas
 * @property {string} nombre
 * @property {string} estado
 * @property {number} restaurante
 */

/**
 * Clase representativa de la tabla [mesas].
 */
export class mesas {
    /**
     * @param {mesas} obj - tipo de objeto representativo de la tabla [mesas].
     */
    constructor(obj) {
        if(obj) {
            this.id_mesas = obj.id_mesas;
            this.nombre = obj.nombre;
            this.estado = obj.estado;
            this.restaurante = obj.restaurante;
        } else {
            this.id_mesas = 0;
            this.nombre = "";
            this.estado = "";
            this.restaurante = 0;
        }
    }
}