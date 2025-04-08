import { Router } from 'express';
import { get_restaurante, post_restaurante, put_restaurante, delete_restaurante } from '../controllers/restaurante.controller.js';
import { get_mesa, get_mesas, post_mesa, put_mesa, delete_mesa } from '../controllers/restaurante.controller.js';
import {get_articulo, get_inventario, post_articulo, put_articulo, delete_articulo, get_inventario_tipo} from '../controllers/inventario.controller.js';
import { get_platillo, post_platillo, put_platillo, delete_platillo } from '../controllers/platillos.controller.js';
import { get_menu, post_menu, put_menu, delete_menu, post_menu_articulo, put_menu_articulo, delete_menu_articulo } from '../controllers/menu.controller.js';
import { get_cliente, get_clientes, post_clientes, put_clientes, delete_clientes } from '../controllers/clientes.controller.js';
import { get_orden, get_ordenes, post_orden, put_orden, put_orden_state, delete_orden, post_orden_articulo, put_orden_articulo, delete_orden_articulo } from '../controllers/ordenes.controller.js';
import { get_reservacion, get_reservaciones, post_reservacion, put_reservacion, delete_reservacion } from '../controllers/reservaciones.controller.js';
import { get_usuario, get_usuarios, post_usuario, put_usuario, delete_usuario } from '../controllers/usuarios.controller.js';
import { log_in, log_out } from '../controllers/auth.controller.js'

// import { get_direccion, post_direccion, put_direccion, delete_direccion } from '../controllers/direcciones.controller.js';
// import { post_telefono, put_telefono, delete_telefono } from '../controllers/telefonos.controller.js';

const router = Router();

//#region Restaurante
router.get("/restaurante/:id?", get_restaurante);
router.post("/restaurante", post_restaurante);
router.put("/restaurante", put_restaurante);
router.delete("/restaurante/:id", delete_restaurante);
//#endregion

//#region Mesas
router.get("/mesa/:id?", get_mesa);
router.get("/mesas/:restaurante?", get_mesas);
router.post("/mesas", post_mesa);
router.put("/mesas", put_mesa);
router.delete("/mesas/:id?", delete_mesa);
//#endregion Mesas

//#region Inventario
router.get("/inventario/:restaurante", get_inventario);
router.get("/inventario/:restaurante/:articulo", get_articulo);
router.get("/inventario/:restaurante/:tipo", get_inventario_tipo);
router.post("/inventario", post_articulo);
router.put("/inventario", put_articulo);
router.delete("/inventario/:restaurante/:articulo", delete_articulo);
//#endregion Inventario

//#region Menu
router.get("/menu/:id?", get_menu);
router.post("/menu", post_menu);
router.put("/menu", put_menu);
router.delete("/menu/:id", delete_menu);

//Menu - Articulos
router.post("/menu/articulo", post_menu_articulo);
router.put("/menu/articulo", put_menu_articulo);
router.delete("/menu/articulo/:id", delete_menu_articulo);
//#endregion Menu

//#region Platillos
router.get("/platillo/:id?", get_platillo);
router.post("/platillo", post_platillo);
router.put("/platillo", put_platillo);
router.delete("/platillo/:id", delete_platillo);
//#endregion Platillos

//#region Clientes
router.get("/cliente/:cedula?", get_cliente);
router.get("/clientes/:id?", get_clientes);
router.post("/cliente", post_clientes);
router.put("/cliente", put_clientes);
router.delete("/cliente/:id", delete_clientes);
//#endregion Clientes

//#region Orden
router.get("/orden/:id?", get_orden);
router.get("/ordenes/:id?", get_ordenes);
router.post("/orden", post_orden);
router.put("/orden", put_orden);
router.put("/orden/:id/:estado", put_orden_state);
router.delete("/orden/:id", delete_orden);

//
router.post("/orden/registro/articulo", post_orden_articulo);
router.put("/orden/registro/articulo", put_orden_articulo);
router.delete("/orden/registro/articulo", delete_orden_articulo);
//#endregion Orden

//#region Reservaciones
router.get("/reservaciones/:id?", get_reservacion);
router.get("/reservaciones/restaurante/:id?", get_reservaciones);
router.post("/reservaciones", post_reservacion);
router.put("/reservaciones", put_reservacion);
router.delete("/reservaciones/:id", delete_reservacion);
//#endregion

//#region Usuarios
router.get("/usuario/:id", get_usuario);
router.get("/usuarios/:id", get_usuarios);
router.post("/usuario", post_usuario);
router.put("/usuario", put_usuario);
router.delete("/usuario/:id", delete_usuario);
//#endregion Usuarios

//#region Usuarios
router.post("/auth/login", log_in)
router.post("/auth/logout/:id", log_out)
router.post("/auth/register", post_usuario);
//#endregion Usuarios

export default router;