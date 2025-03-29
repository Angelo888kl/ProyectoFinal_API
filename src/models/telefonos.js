/**
 * @typedef {Object} Telefono
 * @property {number} id_telefonico
 * @property {number} num_telefono_movil
 * @property {number} num_telefono_fijo
 */

/**
 * Clase representativa de la tabla [telefonos].
 */
export class telefonos {
    /**
     * @param {Telefono} obj - objeto de telefono. 
     */
    constructor(obj) {
        if(obj) {
            this.id_telefonico = obj.id_telefonico;
            this.num_telefono_movil = obj.num_telefono_movil
            this.num_telefono_fijo = obj.num_telefono_fijo;
        } else {
            this.id_telefonico = 0;
            this.num_telefono_movil = 0;
            this.num_telefono_fijo = 0;
        }
    }
}