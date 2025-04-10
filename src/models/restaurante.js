import { direcciones } from './dirrecciones.js';
import { telefonos } from './telefonos.js';

/**
 * @typedef {Object} Restaurante
 * @property {number} id_restaurante
 * @property {number} local
 * @property {string} nombre
 * @property {direcciones | number} direccion 
 * @property {telefonos | number} telefono
*/

/**
 * Clase representativa de la tabla [restaurante].
 */
export class restaurante { 
    /**
     * @param { Restaurante } obj - tipo de objeto representativo de la tabla [restaurante].
     */
    constructor(obj) {
        if(obj) {
            this.id_restaurante = obj.id_restaurante;
            this.local = obj.local;
            this.nombre = obj.nombre;
            this.direccion = obj.direccion;
            this.telefono = obj.telefono;
            this.mesas = [];
            this.menu = [];
        } else {
            this.id_restaurante = 0;
            this.local = 0;
            this.nombre = obj.nombre;
            this.direccion = new direcciones();
            this.telefono = new telefonos();
            this.mesas = [];
            this.menu = [];
        }
    }
}
