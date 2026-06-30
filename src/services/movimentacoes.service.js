import supabase from '../database/supabase.js';

async function criarMovimentacao(dadosMovimentacao) {
  const { data, error } = await supabase
    .from('movimentacoes_estoque')
    .insert([dadosMovimentacao])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default {
  criarMovimentacao
};