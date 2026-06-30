import express from 'express';
import categoriasController from '../controllers/categorias.controller.js';

const router = express.Router();

router.get('/', categoriasController.listarCategorias);

export default router;