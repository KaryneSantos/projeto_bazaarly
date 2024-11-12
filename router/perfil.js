const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('perfil', {user: User});
});

router.post('/usuario/update/:email', (req, res) => {
    const {nome, email} = req.body;

    User.update({nome, email}, {where: {email: req.params.email}})
    .then(() => {
        console.log('Usuário atualizado com sucesso.');
        res.render('perfil', {msg: 'Usuário atualizado com sucesso.'});
    })
    .catch(error => {
        console.log('Erro ao atualizar usuário:', error);
        res.render('perfil', {msg: 'Erro ao atualizar usuário'});
    }); 
        
});

module.exports = router;