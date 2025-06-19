const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CentroDeCusto = sequelize.define('CentroDeCusto', {
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
  tableName: 'centros_de_custo',
  timestamps: true
});

module.exports = CentroDeCusto; 