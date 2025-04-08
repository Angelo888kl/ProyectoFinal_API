/**
 * @typedef {Object} Usuario
 * @property {number} id_usuarios
 * @property {number} restaurante
 * @property {string} nombre_usuario
 * @property {string} contraseña
 * @property {string} correo
 * @property {string} rol
 * @property {string} bloqueada
 */

const rol = { A: 'A', E: 'E', W: 'W'};
const bloqueado = { N: 'N', S: 'S' };

/**
 * Clase representativa de la tabla [usuarios].
 */
export class mUsuarios {
    /**
     * @param { Usuario } obj - tipo de objeto representativo de la tabla [usuarios].
     */
    constructor(obj) {
        if(obj) {
            this.id_usuarios = obj.id_usuarios;
            this.restaurante = obj.restaurante;
            this.nombre_usuario = obj.nombre_usuario;
            this.contraseña = obj.contraseña;
            this.correo = obj.correo;
            this.rol = rol[obj.rol] || 'E';
            this.bloqueada = bloqueado[obj.bloqueada] || 'N';
        } else {
            this.id_usuarios = 0;
            this.restaurante = 0;
            this.nombre_usuario = "";
            this.contraseña = "";
            this.correo = "";
            this.rol = "";
            this.bloqueada = 'N';
        }
    }
}