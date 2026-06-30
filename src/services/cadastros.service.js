import supabase from '../database/supabase.js';

const tabelasPermitidas = [
  'setores',
  'centros_custo',
  'locais_estoque',
  'fornecedores',
  'unidades_medida'
];

function validarTabela(tabela) {
  if (!tabelasPermitidas.includes(tabela)) {
    throw new Error('Tabela não permitida');
  }
}

async function listar(tabela) {
  validarTabela(tabela);

  const { data, error } = await supabase
    .from(tabela)
    .select('*')
    .order('nome', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function criar(tabela, dados) {
  validarTabela(tabela);

  if (!dados.nome) {
    throw new Error('O campo nome é obrigatório');
  }

  const { data, error } = await supabase
    .from(tabela)
    .insert([dados])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default {
  listar,
  criar
};