/**
 * @typedef {Object} PlatilloIngredientes
 * @property {number} id_platillo_ingrediente
 * @property {number} platillo
 * @property {number} ingrediente
 */

/**
 * Clase representativa de la tabla [platillo_ingredientes].
 */
export class mPlatilloIngredientes {
    /**
     * @param {PlatilloIngredientes} obj - tipo de objeto representativo de la tabla [platillo_ingredientes].
     */
    constructor(obj) {
        if(obj) {
            this.id_platillo_ingrediente = obj.id_platillo_ingrediente;
            this.platillo = obj.platillo;
            this.ingrediente = obj.ingrediente;
        } else {
            this.id_platillo_ingrediente = 0;
            this.platillo = 0;
            this.ingrediente = 0;
        }
    }
}
