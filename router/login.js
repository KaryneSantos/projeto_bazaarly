const express = require("express");
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');
const router = express.Router();
const session = require('express-session');
const User = require('../models/user');

router.use(session({
    secret: 'senhaforte1111',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


router.get('/', (req, res) => {
    const email = req.session.userEmail;
    res.render('login', {msg: null, email: email});
});

router.post('/', (req, res) => {
    const {usuario, senha} = req.body;

    console.log('usuario:', usuario);
    console.log('senha:', senha);

    User.findOne({where: {
        [Op.or]: [
            {nome: usuario},
            {email: usuario}
        ]
    }})
        .then(user => {
            if(user) {
                bcrypt.compare(senha, user.senha, (err, match) => {
                    if(err) {
                        console.log('Erro ao comparar senha', err);
                        return res.render('cadastro', {msg:'Erro ao processar solicitação'});
                    }

                    if(match) {
                        req.session.userEmail = user.email;
                        res.render('home', {email: user.email});
                    } else {
                        res.render('login', {msg: 'Senha incorreta'});
                    }
                });
            }
        })
});

module.exports = router;