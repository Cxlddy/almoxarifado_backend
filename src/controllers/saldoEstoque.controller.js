import saldoEstoqueService from '../services/saldoEstoque.service.js';

async function listarSaldoEstoque(req, res) {
  try {
    const saldo = await saldoEstoqueService.listarSaldoEstoque();

    return res.status(200).json(saldo);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao listar saldo de estoque',
      erro: error.message
    });
  }
}

export default {
  listarSaldoEstoque
};
