import supabase from '../database/supabase.js';

async function listarUsuarios() {
  const { data, error } = await supabase
    .from('usuarios')
    .select(`
      id,
      nome,
      email,
      perfil,
      cargo,
      telefone,
      ativo,
      criado_em,
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
    .order('nome', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function criarUsuario(dadosUsuario) {
  const { data, error } = await supabase
    .from('usuarios')
    .insert([dadosUsuario])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function atualizarUsuario(id, dadosUsuario) {
  const { data, error } = await supabase
    .from('usuarios')
    .update(dadosUsuario)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario
};