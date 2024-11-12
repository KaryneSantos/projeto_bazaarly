const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
    },
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
    tipo_usuario: {
        type: DataTypes.ENUM('vendedor', 'comprador'),
        allowNull: false,
        defaultValue: 'comprador',
    },
}, {
    timestamps: true,
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(user.senha, salt);
});

// Produto.associate = (models) => {
//     Produto.hasMany(models.Carrinho, {
//         foreignKey: 'produtoId',
//         as: 'carrinhos',
//     });
// };


module.exports = User;
