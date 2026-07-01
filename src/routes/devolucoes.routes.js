import express from 'express';
import devolucoesController from '../controllers/devolucoes.controller.js';
import { autenticarUsuario, autorizarPerfis } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get(
  '/emprestimos',
  autenticarUsuario,
  autorizarPerfis('admin', 'usuario'),
  devolucoesController.listarEmprestimosPendentes
);

router.post(
  '/solicitar',
  autenticarUsuario,
  autorizarPerfis('admin', 'usuario'),
  devolucoesController.solicitarDevolucao
);

router.get('/confirmar/:token', devolucoesController.telaConfirmar);
router.post('/confirmar/:token', devolucoesController.confirmarDevolucao);

router.get('/negar/:token', devolucoesController.telaNegar);
router.post('/negar/:token', devolucoesController.negarDevolucao);

export default router;
