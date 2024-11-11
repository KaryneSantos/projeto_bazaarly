const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sequelize = require('sequelize');

const {validarSenha, validarEmail} = require('../controllers/validacao_cadastro');

router.get('/', (req, res) => {
    res.render('cadastro', {msg: null});
});

router.post('/', async(req, res) => {
    const {nome_usuario, email, senha, confirmacao_senha, tipo_usuario} = req.body;

        console.log('nome:', nome_usuario);
        console.log('email:', email);
        console.log('senha:', senha);


        // Verifica se os campos obrigátorios estão preenchidos
        if(!nome_usuario || !email || !senha || !confirmacao_senha) {
            console.log('Todos os campos são obrigátorios');
            res.render('cadastro', {msg: 'Todos os campos são obrigátorios'});
        }


        // Verifica se a senha preenchida é válida
        if(!validarSenha(senha)) {
            console.log('A senha deve conter pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais!');
            res.render('cadastro', {msg: 'A senha deve conter pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais!'});
        }


        // Verifica se a senhas se coincidem
        if(senha != confirmacao_senha) {
            console.log('As senhas não coincidem!');
            res.render('cadastro', {msg: 'As senhas não coincidem!'});
        }

        //  Verifica se o email é válido
        if(!validarEmail(email)) {
            console.log('Por favor, insira um e-mail válido!');
            res.render('cadastro', {msg: 'Por favor, insira um e-mail válido!'});
        }



        // Adiciona usuário se estiver todos os campos obrigátorio válido
    try {
        const novoUsuario = await User.create({nome: nome_usuario, email, senha, tipo_usuario});
        console.log('Usuário cadastrado com sucesso.', novoUsuario);
        res.render('home', {email: email});
    } catch (error) {
        console.error('Erro ao cadastrar usuário', error);
        res.render('cadastro', {msg: 'Erro ao cadastrar usuário.'});
    }

});

module.exports = router;