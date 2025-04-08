import { direcciones } from './dirrecciones.js';
import { telefonos } from './telefonos.js';

/**
 * @typedef {Object} Clientes
 * @property {number} id_clientes
 * @property {number} restaurante
 * @property {number} cedula
 * @property {string} nombre
 * @property {direcciones | number} direccion 
 * @property {telefonos | number} telefono
*/

/**
 * Clase representativa de la tabla [clientes].
 */
export class mClientes { 
    /**
     * @param { Clientes } obj - tipo de objeto representativo de la tabla [clientes].
     */
    constructor(obj) {
        if(obj) {
            this.id_clientes = obj.id_clientes;
            this.restaurante = obj.restaurante;
            this.cedula = obj.cedula;
            this.nombre = obj.nombre;
            this.direccion = obj.direccion;
            this.telefono = obj.telefono;

        } else {
            this.id_clientes = 0;
            this.restaurante = 0;
            this.cedula = 0;
            this.nombre = '';
            this.direccion = new direcciones();
            this.telefono = new telefonos();
        }
    }
}