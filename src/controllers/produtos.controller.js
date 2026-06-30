import produtosService from '../services/produtos.service.js';

async function listarProdutos(req, res) {
  try {
    const produtos = await produtosService.listarProdutos();

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao listar produtos',
      erro: error.message
    });
  }
}

async function criarProduto(req, res) {
  try {
    const {
      categoria_id,
      unidade_medida_id,
      nome,
      descricao,
      codigo_interno,
      codigo_barras,
      estoque_minimo,
      estoque_maximo,
      controla_validade,
      controla_lote
    } = req.body;

    if (!nome) {
      return res.status(400).json({
        mensagem: 'O nome do produto é obrigatório'
      });
    }

    const produto = await produtosService.criarProduto({
      categoria_id,
      unidade_medida_id,
      nome,
      descricao,
      codigo_interno,
      codigo_barras,
      estoque_minimo,
      estoque_maximo,
      controla_validade,
      controla_lote
    });

    return res.status(201).json(produto);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao criar produto',
      erro: error.message
    });
  }
}

export default {
  listarProdutos,
  criarProduto
};