/**
 * @typedef {Object} ingrediente_platillo
 * @property {string} ingrediente
 * @property {string} platillo
 */

/**
 * Clase representativa de la tabla [ingredinete_platillo].
 */
export class ingrediente_platillo {
    /**
     * @param {ingrediente_platillo} obj - tipo de objeto representativo de la tabla [ingrediente_platillo].
     */
    constructor(obj) {
        if(obj) {
            this.ingrediente = obj.ingrediente;
            this.platillo = obj.platillo;
        } else {
            this.ingrediente = "";
            this.platillo = "";
        }
    }
}