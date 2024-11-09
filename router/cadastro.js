const express = require('express');
const router = express.Router();

router.get('/cadastro', (req, res) => {
    res.render('cadastrar');
});

router.post('/cadastrar', async(req, res) => {
    const {nome_usuario, email, senha, confirmacao_senha} = req.body;

    try {
        const novoUsuario = await User.create({nome_usuario, email, senha, confirmacao_senha});
        console.log('Usuário cadastrado com sucesso.', novoUsuario);
        res.render('index');
    } catch (error) {
        console.error('Erro ao cadastrar usuário', error);
        res.render('cadastro', {msg: 'Erro ao cadastrar usuário.'});
    }

});

module.exports = router;