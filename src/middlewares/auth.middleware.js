import supabase from '../database/supabase.js';

async function autenticarUsuario(req, res, next) {
  try {
    if (process.env.AUTH_DESABILITADA === 'true') {
      req.usuario = {
        id: null,
        nome: 'Desenvolvimento',
        perfil: 'admin'
      };

      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        mensagem: 'Token de autenticação não informado'
      });
    }

    const token = authHeader.replace('Bearer ', '');

    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData.user) {
      return res.status(401).json({
        mensagem: 'Token inválido ou expirado'
      });
    }

    const { data: usuario, error: usuarioError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', authData.user.id)
      .eq('ativo', true)
      .single();

    if (usuarioError || !usuario) {
      return res.status(403).json({
        mensagem: 'Usuário não cadastrado ou inativo no sistema'
      });
    }

    req.usuario = usuario;

    return next();
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro na autenticação',
      erro: error.message
    });
  }
}

function autorizarPerfis(...perfisPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        mensagem: 'Usuário não autenticado'
      });
    }

    if (!perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({
        mensagem: 'Usuário sem permissão para esta ação'
      });
    }

    return next();
  };
}

export {
  autenticarUsuario,
  autorizarPerfis
};