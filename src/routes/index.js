import { Router } from 'express';
import { get, post, put, delete_restaurante } from '../controllers/restaurante.controller.js';

const router = Router();

router.get("/restaurante/:id", get);
router.post("/restaurante", post);
router.put("/restaurante", put);
router.delete("/restaurante/:id", delete_restaurante);

export default router;