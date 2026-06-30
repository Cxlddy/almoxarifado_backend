import express from 'express';
import autorizacoesController from '../controllers/autorizacoes.controller.js';

const router = express.Router();

router.get('/aprovar/:token', autorizacoesController.aprovar);
router.get('/negar/:token', autorizacoesController.negar);

export default router;