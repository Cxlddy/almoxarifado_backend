import authService from '../services/auth.service.js';

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: 'Email e senha são obrigatórios'
      });
    }

    const resultado = await authService.login(email, senha);

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(401).json({
      mensagem: 'Erro ao fazer login',
      erro: error.message
    });
  }
}

async function logout(req, res) {
  try {
    return res.status(200).json({
      mensagem: 'Logout realizado com sucesso'
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao fazer logout',
      erro: error.message
    });
  }
}

export default {
  login,
  logout
};