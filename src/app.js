const express = require('express');

const app = express();

const productsControllers = require('./controllers/productsControllers');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// iniciando o projeto
app.get('/products', productsControllers.getAll);
app.get('/products/:id', productsControllers.findById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;