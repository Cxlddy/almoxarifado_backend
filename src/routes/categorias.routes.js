import express from 'express';
import categoriasController from '../controllers/categorias.controller.js';
import { autenticarUsuario, autorizarPerfis } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get(
  '/',
  autenticarUsuario,
  autorizarPerfis('admin', 'usuario'),
  categoriasController.listarCategorias
);

export default router;
