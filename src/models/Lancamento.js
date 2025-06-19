const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lancamento = sequelize.define('Lancamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.ENUM('pagamento', 'recebimento'),
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contaBancariaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'contas_bancarias',
      key: 'id'
    }
  },
  receitaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'receitas',
      key: 'id'
    }
  },
  centroDeCustoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'centros_de_custo',
      key: 'id'
    }
  }
}, {
  tableName: 'lancamentos',
  timestamps: true
});

module.exports = Lancamento; 