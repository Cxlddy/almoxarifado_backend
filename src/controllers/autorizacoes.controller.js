import autorizacoesService from '../services/autorizacoes.service.js';

async function aprovar(req, res) {
  try {
    const { token } = req.params;

    await autorizacoesService.responderAutorizacao(token, 'aprovada');

    return res.send(`
      <h1>Solicitação aprovada</h1>
      <p>A autorização foi registrada com sucesso.</p>
    `);
  } catch (error) {
    return res.status(400).send(`
      <h1>Erro na autorização</h1>
      <p>${error.message}</p>
    `);
  }
}

async function negar(req, res) {
  try {
    const { token } = req.params;

    await autorizacoesService.responderAutorizacao(token, 'negada');

    return res.send(`
      <h1>Solicitação negada</h1>
      <p>A negativa foi registrada com sucesso.</p>
    `);
  } catch (error) {
    return res.status(400).send(`
      <h1>Erro na autorização</h1>
      <p>${error.message}</p>
    `);
  }
}

export default {
  aprovar,
  negar
};