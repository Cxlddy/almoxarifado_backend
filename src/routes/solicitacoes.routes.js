import express from 'express';
import solicitacoesController from '../controllers/solicitacoes.controller.js';
import { autenticarUsuario, autorizarPerfis } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get(
  '/',
  autenticarUsuario,
  autorizarPerfis('admin', 'gestor', 'almoxarife'),
  solicitacoesController.listarSolicitacoes
);

router.post(
  '/',
  autenticarUsuario,
  autorizarPerfis('admin', 'gestor', 'almoxarife', 'solicitante'),
  solicitacoesController.criarSolicitacao
);

router.post(
  '/:id/atender',
  autenticarUsuario,
  autorizarPerfis('admin', 'almoxarife'),
  solicitacoesController.atenderSolicitacao
);

export default router;