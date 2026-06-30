import supabase from '../database/supabase.js';

async function listarSaldoEstoque() {
  const { data, error } = await supabase
    .from('view_saldo_estoque')
    .select('*')
    .order('produto', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default {
  listarSaldoEstoque
};