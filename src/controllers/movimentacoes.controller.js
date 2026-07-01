import movimentacoesService from '../services/movimentacoes.service.js';

async function criarMovimentacao(req, res) {
  try {
    const {
      produto_id,
      local_estoque_id,
      fornecedor_id,
      tipo,
      origem,
      quantidade,
      lote,
      data_validade,
      documento,
      observacao
    } = req.body;

    if (!produto_id) {
      return res.status(400).json({ mensagem: 'O produto é obrigatório' });
    }

    if (!local_estoque_id) {
      return res.status(400).json({ mensagem: 'O local de estoque é obrigatório' });
    }

    if (!tipo) {
      return res.status(400).json({ mensagem: 'O tipo da movimentação é obrigatório' });
    }

    if (!quantidade || quantidade <= 0) {
      return res.status(400).json({ mensagem: 'A quantidade deve ser maior que zero' });
    }

    const movimentacao = await movimentacoesService.criarMovimentacao({
      produto_id,
      local_estoque_id,
      usuario_id: req.usuario.id,
      fornecedor_id,
      tipo,
      origem: origem || 'manual',
      quantidade,
      lote,
      data_validade,
      documento,
      observacao
    });

    return res.status(201).json(movimentacao);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao criar movimentação de estoque',
      erro: error.message
    });
  }
}

export default {
  criarMovimentacao
};
