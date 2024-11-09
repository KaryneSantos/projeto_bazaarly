const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');


const User = sequelize.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(user.senha, salt);
});

module.exports = User;