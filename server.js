// Importando as bibliotecas necessárias
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const TagCount = require('./src/models/tagData');
const path = require('path');

// Criando a instância do aplicativo Express
const app = express();

// Configurando o Express para usar JSON e tratar formulários enviados via URL
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configurando o mecanismo de visualização EJS
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Rota GET para a página inicial
app.get('/', async (req, res) => {
  try {
    // Recupere os dados da tagCounts do banco de dados (ou de onde você está armazenando esses dados)
    const tagCounts = await TagCount.find({});

    // Renderize a visualização index.ejs e passe a variável 'tagCounts' como objeto
    res.render('index', { tagCounts });
  } catch (error) {
    res.status(500).send('Error retrieving tag counts from the database');
  }
});

// Rota POST para obter tags a partir de uma URL
app.post('/getTags', async (req, res) => {
  try {
    const url = req.body.url;
    console.log('URL recebida:', url);

    // Faz uma solicitação HTTP para a URL usando Axios
    const response = await axios.get(url);
    const html = response.data;

    // Usa Cheerio para fazer o parsing do HTML e contar as ocorrências de tags
    const $ = cheerio.load(html);
    const tags = {};

    $('*').each((i, element) => {
      const tagName = $(element).prop('tagName');
      if (tagName) {
        const normalizedTagName = tagName.toLowerCase();
        tags[normalizedTagName] = (tags[normalizedTagName] || 0) + 1;
      }
    });

    // Salvar as informações no banco de dados MongoDB
    const tagCounts = Object.entries(tags).map(([tag, count]) => {
      const tagCount = new TagCount({ url, tag, count });
      return tagCount.save();
    });

    await Promise.all(tagCounts);

    // Redireciona para a rota de exibição de tags após o salvamento bem-sucedido
    res.redirect('/displayTags');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Link não reconhecido, volte à página e tente novamente com um site mais simples, como o exemplo fornecido na caixa de entrada.');
  }
});

// Rota GET para exibir as contagens de tags no banco de dados
app.get('/displayTags', async (req, res) => {
  try {
    // Recupere os dados da tagCounts do banco de dados (ou de onde você está armazenando esses dados)
    const tagCounts = await TagCount.find({});

    // Renderize a visualização displayTags.ejs e passe a variável 'tagCounts' como objeto
    res.render('displayTags', { tagCounts });
  } catch (error) {
    res.status(500).send('Link não reconhecido, volte à página e tente novamente com um site mais simples, como o exemplo fornecido na caixa de entrada.');
  }
});

// Conectando ao banco de dados MongoDB e iniciando o servidor na porta 3000
mongoose.connect('mongodb://127.0.0.1:27017/contador-tags', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao MongoDB.');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000.');
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });