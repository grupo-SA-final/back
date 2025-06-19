const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContaBancaria = sequelize.define('ContaBancaria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomeBanco: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipoConta: {
    type: DataTypes.ENUM('corrente', 'poupanca', 'investimento'),
    allowNull: false
  },
  agencia: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  numeroConta: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'contas_bancarias',
  timestamps: true
});

module.exports = ContaBancaria; 