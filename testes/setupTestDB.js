const sequelize = require('../src/config/database');

module.exports = async () => {
  // Desabilita restrições de chave estrangeira, trunca todas as tabelas e reabilita
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  const [tables] = await sequelize.query("SHOW TABLES");
  for (const tableObj of tables) {
    const table = Object.values(tableObj)[0];
    if (table !== 'SequelizeMeta') {
      await sequelize.query(`TRUNCATE TABLE \`${table}\``);
    }
  }
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
}; 