import supabase from '../database/supabase.js';

async function listarProdutos() {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      id,
      nome,
      descricao,
      codigo_interno,
      codigo_barras,
      estoque_minimo,
      estoque_maximo,
      ativo,
      categorias (
        id,
        nome
      ),
      unidades_medida (
        id,
        sigla,
        nome
      )
    `)
    .order('nome', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function criarProduto(dadosProduto) {
  const { data, error } = await supabase
    .from('produtos')
    .insert([dadosProduto])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default {
  listarProdutos,
  criarProduto
};