const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrinho = sequelize.define('Carrinho', {
    carrinhoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    precoTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: true,
});

Produto.associate = (models) => {
    Produto.hasMany(models.Carrinho, {
        foreignKey: 'produtoId',
        as: 'carrinhos',
    });
    User.associate = (models) => {
        User.hasMany(models.Carrinho, {
            foreignKey: 'userId',
            as: 'carrinhos',
        });
    };  
};

module.exports = Carrinho;
