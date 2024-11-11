const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    produtoId: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
    },
    quantidadeEmEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
}, {
    timestamps: true,  
});


Produto.associate = (models) => {
    Produto.hasMany(models.Carrinho, {
        foreignKey: 'produtoId', 
        as: 'carrinho',to
    });
};

module.exports = Produto;
