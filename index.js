const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota inicial
const indexRouter = require('./router/index');
app.use('/', indexRouter);

// Rota cadastrar
const cadastrarRouter = require('./router/cadastro');
app.use('/cadastro', cadastrarRouter);

// Rota login    
const loginRouter = require('./router/login');
app.use('/login', loginRouter);

// Rota carrinho
const carrinhoRouter = require('./router/carrinho');
app.use('/carrinho', carrinhoRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});