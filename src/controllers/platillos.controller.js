import { getConnection, executeQuery, executeQueryTR, closeConnection } from "../configurations/index.js";
import { queries } from "../configurations/index.js";
import { mArticulo } from "../models/articulo.js";

//importe de clases
import { mPlatillos } from "../models/platillo.js";
import { mPlatilloIngredientes } from "../models/platillo_ingredientes.js";

export const get_platillo = async (req, res) => {
    try {
        const { id } = req.params;
        let resultRequest = null;

        if (id > 0) {
            // Obtener un solo platillo por ID.
            resultRequest = await executeQuery(queries.get_platillo, [id]);
            if (resultRequest.length > 0) {
                const platillo = new mPlatillos(resultRequest[0]);
                const resultQueryIngredientes = await executeQuery(queries.get_platillo_ingredintes, [platillo.id_platillos]);
                if(resultQueryIngredientes.length > 0) {
                    const lista_ingredientes = resultQueryIngredientes.map((item) => new mPlatilloIngredientes(item));
                    for(const item of lista_ingredientes) {
                        const resultQueryArticulo = await executeQuery(queries.get_ingrediente, [item.ingrediente]);
                        if(resultQueryArticulo.length > 0){
                            const ingrediente = new mArticulo(resultQueryArticulo[0]);
                            platillo.ingredientes.push(ingrediente);
                        }
                    }
                }
                return res.status(200).json({ message: "", platillo: platillo });
            } else {
                return res.status(200).json({ message: "No hay datos registrados.", platillo: null });
            }
        } else {
            // Obtener todos los platillos.
            resultRequest = await executeQuery(queries.get_platillos);
            if (resultRequest.length > 0) {
                const listPlatillos = resultRequest.map((item) => new mPlatillos(item));
                for (const platillo of listPlatillos) {
                    const resultQueryIngredientes = await executeQuery(queries.get_platillo_ingredintes, [platillo.id_platillos]);
                    if(resultQueryIngredientes.length > 0) {
                        const lista_ingredientes = resultQueryIngredientes.map((item) => new mPlatilloIngredientes(item));
                        for(const item of lista_ingredientes) {
                            const resultQueryArticulo = await executeQuery(queries.get_ingrediente, [item.ingrediente]);
                            if(resultQueryArticulo.length > 0){
                                const ingrediente = new mArticulo(resultQueryArticulo[0]);
                                platillo.ingredientes.push(ingrediente);
                            }
                        }
                    }
                }
                return res.status(200).json({ message: "", platillos: listPlatillos });
            } else {
                return res.status(200).json({ message: "No hay datos registrados.", platillos: null });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", platillo: null, error: error });
    }
}

export const post_platillo = async (req, res) => {
    try {
        const platillo = new mPlatillos(req.body);
        const result = await executeQuery(queries.post_platillo, [platillo.nombre]);

        if (result.affectedRows > 0) {
            platillo.id_platillos = result.insertId;

            // Verificar que exista un arreglo de ingredientes
            if (Array.isArray(platillo.ingredientes) && platillo.ingredientes.length > 0) {
                const ingredientes_real = [];

                for (const item of platillo.ingredientes) {
                    const resultQueryArticulo = await executeQuery(queries.get_ingrediente, [item.id_articulo]);
                    if (resultQueryArticulo.length > 0) {
                        const ingrediente = new mArticulo(resultQueryArticulo[0]);

                        // Inserción de cada ingrediente, utilizando su id_articulo
                        const a = await executeQuery(queries.post_platillo_ingredientes, [platillo.id_platillos, ingrediente.id_articulo]);
                        ingredientes_real.push(ingrediente);
                    }
                }

                platillo.ingredientes = ingredientes_real; // Sobrescribimos con los datos completos
            }
        }

        return res.status(200).json({ message: "Platillo registrado correctamente.", platillo: platillo });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: error.message, platillo: req.body, error });
    }
};

export const put_platillo = async (req, res) => {
    try {
        const platillo = new mPlatillos(req.body);
        const result = await executeQuery(queries.update_platillo, [platillo.nombre, platillo.id_platillos]);

        if (result.affectedRows > 0) {
            // Si se envían ingredientes, se sincronizan
            if (Array.isArray(platillo.ingredientes) && platillo.ingredientes.length > 0) {
                // Eliminar ingredientes actuales
                const resultDeleteIngredientes = await executeQuery(queries.delete_platillo_ingredientes, [platillo.id_platillos]);
                if (resultDeleteIngredientes.affectedRows === 0)
                    return res.status(400).json({ message: "No se pudieron eliminar los ingredientes del platillo.", platillo: null });

                const ingredientes_real = [];

                for (const item of platillo.ingredientes) {
                    const resultQueryArticulo = await executeQuery(queries.get_ingrediente, [item.id_articulo]);
                    if (resultQueryArticulo.length > 0) {
                        const ingrediente = new mArticulo(resultQueryArticulo[0]);

                        // Insertar ingrediente
                        const a = await executeQuery(queries.post_platillo_ingredientes, [platillo.id_platillos,ingrediente.id_articulo]);
                        ingredientes_real.push(ingrediente);
                    }
                }

                platillo.ingredientes = ingredientes_real; // Sobrescribimos con los datos reales
            }
        }

        return res.status(200).json({ message: "Platillo actualizado correctamente.", platillo });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ messages: error.message, platillo: req.body, error });
    }
};

export const delete_platillo = async (req, res) => {
    try {
        const { id } = req.params;
        const resultRequest = await executeQuery(queries.get_platillo, [id]);
        if (resultRequest.length === 0) {
            return res.status(400).json({ message: "No se encontró el platillo a eliminar", platillo: null });
        }
        const platilloData = new mPlatillos(resultRequest[0]);
        const resultDeleteIngredientes = await executeQuery(queries.delete_platillo_ingredientes, [platilloData.id_platillos]);
        if (resultDeleteIngredientes.affectedRows === 0) {
            return res.status(200).json({ message: "Platillo eliminado, pero no se pudieron eliminar los ingredientes del platillo.", platillo: null });
        }
        const resultDeletePlatillo = await executeQuery(queries.delete_platillo, [platilloData.id_platillos]);
        if (resultDeletePlatillo.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo eliminar el platillo.", platillo: null });
        }
        return res.status(200).json({ message: "Platillo eliminado correctamente.", platillo: platilloData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "No se pudo ejecutar la consulta.", platillo: null, error: error });
    }
}
