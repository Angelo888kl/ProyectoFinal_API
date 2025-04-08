/**
 * @typedef {Object} Mesas
 * @property {number} id_mesas
 * @property {string} nombre
 * @property {string} estado
 * @property {number} restaurante
 */


// O - Ocupada, C - Cancelada, R - Reservada, L - Libre
const estado = { O: 'O', C: 'C', R: 'R', L: 'L' };

/**
 * Clase representativa de la tabla [mesas].
 */
export class mMesas {
    /**
     * @param { Mesas } obj - tipo de objeto representativo de la tabla [mesas].
     */
    constructor(obj) {
        if(obj) {
            this.id_mesas = obj.id_mesas;
            this.nombre = obj.nombre;
            this.estado = estado[obj.estado] || 'O'; // Asignar un valor por defecto si el estado no es válido
            this.restaurante = obj.restaurante;
        } else {
            this.id_mesas = 0;
            this.nombre = "";
            this.estado = 'O';
            this.restaurante = 0;
        }
    }
}