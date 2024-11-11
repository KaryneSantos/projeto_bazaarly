//const express = require("express");
//const router = express.Router(); const Carrinho = require('../models/carrinho');
//const {Op} = require('sequelize');




//router.get('/', async (req, res) => {
    //res.render('carrinho');
//});

//router.post('/', (req, res) => {   try{       const userId = req.user.id;       const itensCarrinho = await Carrinho.findAll({           where: { userId, status: ativo},           include: [               { Model: require('../model/user'), as: 'user'},               { Model: require('../model/produto'), as: 'user'}           ]       })   }
 //})

//module.exports = router;