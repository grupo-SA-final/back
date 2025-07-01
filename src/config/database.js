const { Sequelize } = require('sequelize');

// Primeiro, conecta sem especificar o banco para poder criá-lo
const sequelizeMaster = new Sequelize('mysql', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

// Função para criar o banco de dados se não existir
async function createDatabaseIfNotExists() {
  try {
    await sequelizeMaster.authenticate();
    await sequelizeMaster.query('CREATE DATABASE IF NOT EXISTS sistema_financeiro;');
    console.log('✅ Banco de dados verificado/criado com sucesso.');
    await sequelizeMaster.close();
  } catch (error) {
    console.error('❌ Erro ao criar banco de dados:', error);
    throw error;
  }
}

// Executa a criação do banco
createDatabaseIfNotExists();

// Configuração principal do Sequelize
const sequelize = new Sequelize('sistema_financeiro', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: false
  },
  sync: {
    force: false,
    alter: true
  }
});

module.exports = sequelize; 