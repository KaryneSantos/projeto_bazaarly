const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrinho = sequelize.define('Carrinho', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id', 
        },
    },
    
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Produtos', 
            key: 'id',
        },
    },

    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ativo',
    },
}, {

    timestamps: true, 
});

Carrinho.associate = (models) => {
    Carrinho.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
    });
    
    Carrinho.belongsTo(models.Produto, {
        foreignKey: 'produtoId',
        as: 'produto',
    });
};

module.exports = Carrinho;
