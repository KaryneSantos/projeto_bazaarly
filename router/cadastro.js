const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sequelize = require('sequelize');

router.get('/', (req, res) => {
    res.render('cadastro', {msg: null});
});

router.post('/', async(req, res) => {
    const {nome_usuario, email, senha, confirmacao_senha, tipo_usuario} = req.body;

        console.log('nome:', nome_usuario);
        console.log('email:', email);
        console.log('senha:', senha);

        if(senha != confirmacao_senha) {
            console.log('Senhas diferentes');
            res.render('cadastro', {msg: 'Senhas diferentes'});
        }

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