const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', routes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Função para inicializar o banco de dados
async function initializeDatabase() {
  try {
    // Testar conexão
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar modelos com o banco (criar tabelas se não existirem)
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados com o banco de dados.');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📱 API disponível em: http://localhost:${PORT}/api`);
      console.log(`🔐 Endpoints de autenticação: http://localhost:${PORT}/api/auth`);
      console.log(`💰 Endpoints do sistema: http://localhost:${PORT}/api/centros-de-custo, /receitas, /contas-bancarias, /lancamentos`);
    });

  } catch (error) {
    console.error('❌ Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  }
}

// Inicializar aplicação
initializeDatabase();

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error('Erro não tratado (Promise):', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Erro não tratado (Exception):', err);
  process.exit(1);
});
