import categoriasService from '../services/categorias.service.js';

async function listarCategorias(req, res) {
  try {
    const categorias = await categoriasService.listarCategorias();

    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao listar categorias',
      erro: error.message
    });
  }
}

export default {
  listarCategorias
};