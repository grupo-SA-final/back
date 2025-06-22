const Usuario = require('./Usuario');
const CentroDeCusto = require('./CentroDeCusto');
const Receita = require('./Receita');
const ContaBancaria = require('./ContaBancaria');
const Lancamento = require('./Lancamento');

// Associações
ContaBancaria.hasMany(Lancamento, { foreignKey: 'contaBancariaId' });
Lancamento.belongsTo(ContaBancaria, { foreignKey: 'contaBancariaId', as: 'ContaBancaria' });

Receita.hasMany(Lancamento, { foreignKey: 'receitaId' });
Lancamento.belongsTo(Receita, { foreignKey: 'receitaId', as: 'Receita' });

CentroDeCusto.hasMany(Lancamento, { foreignKey: 'centroDeCustoId' });
Lancamento.belongsTo(CentroDeCusto, { foreignKey: 'centroDeCustoId', as: 'CentroDeCusto' });

Usuario.hasMany(Lancamento, { foreignKey: 'usuarioId' });
Lancamento.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'Usuario' });

Usuario.hasMany(CentroDeCusto, { foreignKey: 'usuarioId' });
CentroDeCusto.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Receita, { foreignKey: 'usuarioId' });
Receita.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(ContaBancaria, { foreignKey: 'usuarioId' });
ContaBancaria.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = {
  Usuario,
  CentroDeCusto,
  Receita,
  ContaBancaria,
  Lancamento
}; 