import supabase from '../database/supabase.js';

async function listarCategorias() {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nome', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default {
  listarCategorias
};