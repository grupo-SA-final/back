const app = require('./src/index');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  }
}

startServer(); 