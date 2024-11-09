const express = require("express");
const bcrypt = require('bcrypt');
const {Op} = require('sequelize')
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const {usuario, senha} = req.body;

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
                    }
                });
            }
        })
});

module.exports = router;