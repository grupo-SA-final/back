const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Receita = sequelize.define('Receita', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'receitas',
  timestamps: true
});

module.exports = Receita; 