import { mArticulo } from './articulo.js';
import { mPlatillos } from './platillo.js';
/**
 * @typedef {Object} OrdenesArticulos
 * @property {number} orden
 * @property {mPlatillos | mArticulo | number} articulo
 * @property {string} tipo
 */

const tipos = { P: 'P', B: 'B', I: 'I', O: 'O' };

/**
 * Clase representativa de la tabla [ordenes].
 */
export class mOrdenesArticulos {
    /**
     * @param { OrdenesArticulos } obj - tipo de objeto representativo de la tabla [ordenes].
     */
    constructor(obj) {
        if(obj) {
            this.orden = obj.orden;
            this.articulo = obj.articulo;
            this.tipo = tipos[obj.tipo] || 'O';
        } else {
            this.orden = 0;
            this.articulo = 0;
            this.tipo = 'O';
        }
    }
}