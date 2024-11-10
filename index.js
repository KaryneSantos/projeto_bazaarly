const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./models/user');

app.use('/user', userRoutes);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

sequelize.sync({ force: false }).then(() => {
    console.log('Banco de dados sincronizado.');
}).catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});

// Rota inicial
const indexRouter = require('./router/index');
app.use('/', indexRouter);

// Rota cadastrar
const cadastrarRouter = require('./router/cadastro');
app.use('/cadastrar', cadastrarRouter);

// Rota login    
const loginRouter = require('./router/login');
app.use('/login', loginRouter);

// Rota carrinho
const carrinhoRouter = require('./router/carrinho');
app.use('/carrinho', carrinhoRouter);

// Rota home
const homeRouter = require('./router/home');
app.use('/home', homeRouter);

// Rota de Joias
const joiasRouter = require('./router/ct-joias')
app.use('/ct-joias', joiasRouter)

// Rota de sapato
const sapatoRouter = require('./router/sapato')
app.use('/sapato', sapatoRouter)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});