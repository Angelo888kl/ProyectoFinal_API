/**
 * @typedef {Object} Direccion
 * @property {number} id_direcciones
 * @property {string} provincia
 * @property {string} canton
 * @property {string} distrito
 * @property {string} direccion
 */

/**
 * Clase representativa de la tabla [direcciones].
 */
export class direcciones {
    /**
     * @param {Direccion} obj - 
     */
    constructor(obj) {
        if(obj) {
            this.id_direcciones = obj.id_direcciones;
            this.provincia = obj.provincia;
            this.canton = obj.canton;
            this.distrito = obj.distrito;
            this.direccion = obj.direccion;
        } else {
            this.id_direcciones = 0;
            this.provincia = "";
            this.canton = "";
            this.distrito = "";
            this.direccion = "";
        }
    }
}