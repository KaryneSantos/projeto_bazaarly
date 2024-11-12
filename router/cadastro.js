const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sequelize = require('sequelize');

const {validarSenha, validarEmail} = require('../controllers/validacao_cadastro');

router.get('/', (req, res) => {
    res.render('cadastro', {msg: null, nome_usuario: '', email: '', senha: '', confirmacao_senha: ''});
});

router.post('/', async(req, res) => {
    const {nome, email, senha, confirmacao_senha, tipo_usuario} = req.body;

        console.log('nome:', nome);
        console.log('email:', email);
        console.log('senha:', senha);


        // Verifica se os campos obrigátorios estão preenchidos
        if(!nome || !email || !senha || !confirmacao_senha) {
            console.log('Todos os campos são obrigátorios');
            return res.render('cadastro', {msg: 'Todos os campos são obrigátorios', nome_usuario, email, senha, confirmacao_senha});
        }


        // Verifica se a senha preenchida é válida
        if(!validarSenha(senha)) {
            console.log('A senha deve conter pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais!');
            return res.render('cadastro', {msg: 'A senha deve conter pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais!', nome_usuario, email});
        }


        // Verifica se a senhas se coincidem
        if(senha != confirmacao_senha) {
            console.log('As senhas não coincidem!');
            return res.render('cadastro', {msg: 'As senhas não coincidem!', nome_usuario, email, senha});
        }

        //  Verifica se o email é válido
        if(!validarEmail(email)) {
            console.log('Por favor, insira um e-mail válido!');
            return res.render('cadastro', {msg: 'Por favor, insira um e-mail válido!', nome_usuario, email: '', senha, confirmacao_senha});
        }

        // Adiciona usuário se estiver todos os campos obrigátorio válido
    try {
        const novoUsuario = await User.create({nome, email, senha, tipo_usuario});
        console.log('Usuário cadastrado com sucesso.', novoUsuario);
        res.render('home', {email: email});
    } catch (error) {
        console.error('Erro ao cadastrar usuário', error);
        res.render('cadastro', {msg: 'Erro ao cadastrar usuário.'});
    }

});

module.exports = router;