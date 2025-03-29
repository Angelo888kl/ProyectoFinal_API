import { Router } from 'express';
import { get_restaurante, post_restaurante, put_restaurante, delete_restaurante } from '../controllers/restaurante.controller.js';
import { get_direccion, post_direccion, put_direccion, delete_direccion } from '../controllers/direcciones.controller.js';
import { get_telefono, post_telefono, put_telefono, delete_telefono } from '../controllers/telefonos.controller.js';

const router = Router();

router.get("/restaurante/:id?", get_restaurante);
router.post("/restaurante", post_restaurante);
router.put("/restaurante", put_restaurante);
router.delete("/restaurante/:id", delete_restaurante);

router.get("/direcciones/:id?", get_direccion);
router.post("/direcciones", post_direccion);
router.put("/direcciones", put_direccion);
router.delete("/direcciones/:id", delete_direccion);

router.get("/telefonos/:id?", get_telefono);
router.post("/telefonos", post_telefono);
router.put("/telefonos", put_telefono);
router.delete("/telefonos/:id", delete_telefono);

export default router;