const app = require('./src/index');
const sequelize = require('./src/config/database');
const models = require('./src/models');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Testa a conexão com o banco
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincroniza os modelos com o banco
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Modelos sincronizados com o banco de dados.');
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

    // Tratamento de erro para porta em uso
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`⚠️  Porta ${PORT} já está em uso. Tentando porta ${PORT + 1}...`);
        server.listen(PORT + 1);
      } else {
        console.error('❌ Erro no servidor:', error);
      }
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  }
}

startServer(); 