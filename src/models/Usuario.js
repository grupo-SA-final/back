const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  documento: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.senha) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('senha')) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    }
  }
});

Usuario.prototype.verificarSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = Usuario; 