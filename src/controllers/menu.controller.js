import { getConnection, executeQuery, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";

//importe de clases
import { mMenu } from "../models/menu.js";
import { mPlatillos } from '../models/platillo.js';
import { mArticulo } from '../models/articulo.js';
import { mMenuArticulos } from '../models/menu_articulos.js';

export const get_menu = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await executeQuery(queries.get_menu_restaurante, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No hay menus para este restaurante", menu: null });
        }
        const menu = new mMenu(result[0]);
        const itemsMenu = await executeQuery(queries.get_menu_articulo, [menu.id_menu]);
        if (itemsMenu.length === 0) {
            return res.status(200).json({ message: "No hay platillos para este menu", menu: menu });
        }
        menu.platillos = [];
        menu.bebidas = [];
        menu.otros = [];
        for (const item of itemsMenu) {
            const instancia = new mMenuArticulos(item);
            if (item.tipo === "P") {
                const platillo = await executeQuery(queries.get_platillo, [instancia.articulo]);
                if (platillo.length != 0) {
                    menu.platillos.push(new mPlatillos(platillo[0]));
                }
            } else if (item.tipo === "B") {
                const platillo = await executeQuery(queries.get_articulo, [menu.restaurante, instancia.articulo]);
                if(platillo.length != 0) { 
                    menu.bebidas.push(new mArticulo(platillo[0]));
                }
            } else {
                const platillo = await executeQuery(queries.get_articulo, [menu.restaurante, instancia.articulo]);
                if(platillo.length != 0) { 
                    menu.otros.push(new mArticulo(platillo[0]));
                }
            }
        }
        return res.status(200).json({ message: "", menu: menu });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", menu: null, error: error });
    }
}

export const post_menu = async (req, res) => {
    try {
        const menu = new mMenu(req.body);
        const result = await executeQuery(queries.post_menu, [menu.restaurante, menu.nombre]);
        if (result.affectedRows > 0) {
            menu.id_menu = result.insertId;
            return res.status(200).json({ message: "Menu registrado correctamente", menu: menu });
        } else {
            return res.status(400).json({ message: "Error al registrar el menu", menu: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", menu: null, error: error });
    }
}

export const put_menu = async (req, res) => {
    try {
        const menu = new mMenu(req.body);
        const result = await executeQuery(queries.update_menu, [menu.nombre, menu.id_menu]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Menu actualizado correctamente", menu: menu });
        } else {
            return res.status(400).json({ message: "Error al actualizar el menu", menu: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", menu: null, error: error });
    }
}

export const delete_menu = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await executeQuery(queries.update_menu, [id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Menu eliminado correctamente", menu: null });
        } else {
            return res.status(400).json({ message: "Error al eliminar el menu", menu: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", menu: null, error: error });
    }
}

// HTTPS Items del Menu
export const post_menu_articulo = async (req, res) => {
    try {
        const menu_articulos = new mMenuArticulos(req.body);
        const result = await executeQuery(queries.post_menu_articulo, [menu_articulos.menu, menu_articulos.articulo, menu_articulos.tipo]);
        if (result.affectedRows > 0) {
            menu_articulos.id_menu_articulos = result.insertId;
            return res.status(200).json({ message: "Articulo registrado correctamente.", menu_articulo: menu_articulos });
        } else {
            return res.status(400).json({ message: "Error al registrar el articulo en el menu.", menu_articulo: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", menu_articulo: null, error: error });
    }
}

export const put_menu_articulo = async (req, res) => {
    try {
        const menu_articulos = new mMenuArticulos(req.body);
        const result = await executeQuery(queries.update_menu_articulo, [menu_articulos.articulo, menu_articulos.tipo, menu_articulos.id_menu_articulos]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Articulo actualizado correctamente.", menu_articulo: menu_articulos });
        } else {
            return res.status(400).json({ message: "Error al actualizar el articulo en el menu.", menu_articulo: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", menu_articulo: null, error: error });
    }
}

export const delete_menu_articulo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await executeQuery(queries.delete_menu_articulo, [id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Articulo eliminado correctamente.", menu_articulo: id });
        } else {
            return res.status(400).json({ message: "Error al eliminar el articulo en el menu.", menu_articulo: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error en consulta", menu_articulo: null, error: error });
    }
}




