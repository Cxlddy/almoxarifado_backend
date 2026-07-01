import supabase from '../database/supabase.js';

async function listarUsuarios() {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
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
