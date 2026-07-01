import express from 'express';
import saldoEstoqueController from '../controllers/saldoEstoque.controller.js';
import { autenticarUsuario, autorizarPerfis } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get(
  '/',
  autenticarUsuario,
  autorizarPerfis('admin', 'usuario'),
  saldoEstoqueController.listarSaldoEstoque
);

export default router;
