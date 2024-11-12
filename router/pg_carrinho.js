const express = require("express");
const router = express.Router();
// const Carrinho = require('../models/carrinho');
// const {Op} = require('sequelize');

router.get('/', async (req, res) => {
    res.render('carrinho');
});

module.exports = router;