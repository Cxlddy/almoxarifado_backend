import express from 'express';
import produtosController from '../controllers/produtos.controller.js';

const router = express.Router();

router.get('/', produtosController.listarProdutos);
router.post('/', produtosController.criarProduto);

export default router;