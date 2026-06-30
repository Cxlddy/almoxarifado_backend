import express from 'express';
import usuariosController from '../controllers/usuarios.controller.js';

const router = express.Router();

router.get('/', usuariosController.listarUsuarios);
router.post('/', usuariosController.criarUsuario);
router.patch('/:id', usuariosController.atualizarUsuario);

export default router;