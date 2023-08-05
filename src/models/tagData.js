// Importando a biblioteca Mongoose
const mongoose = require('mongoose');

// Definindo o esquema do modelo de dados para a coleção 'tagCounts'
const tagCountSchema = new mongoose.Schema({
  // Definindo o campo 'url' como uma string obrigatória
  url: { type: String, required: true },

  // Definindo o campo 'tag' como uma string obrigatória
  tag: { type: String, required: true },

  // Definindo o campo 'count' como um número obrigatório
  count: { type: Number, required: true },
});

// Criando o modelo 'TagCount' a partir do esquema 'tagCountSchema'
const TagCount = mongoose.model('TagCount', tagCountSchema);

// Exportando o modelo 'TagCount' para que possa ser utilizado em outros arquivos
module.exports = TagCount;