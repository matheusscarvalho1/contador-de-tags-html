# [Contador de TAGS de páginas HTML de acordo com a URL fornecida]

Este é um projeto simples de contador de tags HTML que permite ao usuário inserir uma URL e contar a quantidade de ocorrências de cada tag HTML na página correspondente. O projeto foi desenvolvido com Node.js, Express, MongoDB e utiliza a biblioteca Cheerio para fazer o parsing do HTML.

## Instalação

Para executar o projeto, siga os passos abaixo:

1. Certifique-se de ter o Node.js instalado em seu sistema. Caso não tenha, você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Clone ou baixe este repositório para o seu computador.

3. No diretório do projeto, abra um terminal ou prompt de comando e execute o seguinte comando para instalar as dependências:

npm install

## Configuração do MongoDB

Antes de executar o projeto, você precisará configurar uma instância do MongoDB localmente ou em um servidor remoto. O projeto foi configurado para se conectar a uma instância local do MongoDB por padrão. Caso queira configurar para uma instância remota, você pode modificar a URL de conexão em `app.js`:

```javascript
mongoose.connect('mongodb://localhost:27017/contador-tags', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


Substitua 'mongodb://localhost:27017/contador-tags' pela URL de conexão da sua instância do MongoDB.

Executando o Projeto
Após a instalação das dependências e a configuração do MongoDB, você pode executar o projeto usando o seguinte comando:

npm start

Isso iniciará o servidor na porta 3000. Agora você pode acessar o contador de tags HTML em seu navegador, digitando a seguinte URL:

http://localhost:3000/

Como Usar
Na página inicial, você verá um formulário onde você pode inserir a URL de um site que deseja contar as tags HTML. Insira a URL desejada e clique no botão "Processar".

O servidor processará a URL e contará a quantidade de ocorrências de cada tag HTML na página correspondente. Os resultados serão salvos no banco de dados MongoDB.

Após o processamento, você será redirecionado para uma página que exibe uma tabela com os resultados do contador de tags HTML.

Para ver os resultados de contagens anteriores, você pode clicar no link "Mostrar Contagens Anteriores" na parte superior da página.

Observação -> Só consegui fazer com que fosse só 1 link por vez, não consegui fazer como foi pedido para colocar uma lista de URLs separadas por vírgula

## Dependências Principais

Node.js
Express
MongoDB
Cheerio

```
