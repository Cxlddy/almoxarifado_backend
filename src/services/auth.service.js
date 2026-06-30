import { createClient } from '@supabase/supabase-js';
import supabase from '../database/supabase.js';

const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function login(email, senha) {
  const { data: loginData, error: loginError } =
    await supabaseAuth.auth.signInWithPassword({
      email,
      password: senha
    });

  if (loginError) {
    throw new Error(loginError.message);
  }

  const userId = loginData.user.id;

  const { data: usuario, error: usuarioError } = await supabase
    .from('usuarios')
    .select(`
      id,
      nome,
      email,
      perfil,
      cargo,
      telefone,
      ativo,
      setores (
        id,
        nome
      ),
      centros_custo (
        id,
        codigo,
        nome
      )
    `)
    .eq('id', userId)
    .eq('ativo', true)
    .single();

  if (usuarioError || !usuario) {
    throw new Error('Usuário não cadastrado ou inativo no sistema');
  }

  return {
    access_token: loginData.session.access_token,
    refresh_token: loginData.session.refresh_token,
    usuario
  };
}

export default {
  login
};