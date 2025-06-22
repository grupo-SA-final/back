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

module.exports = {
  Usuario,
  CentroDeCusto,
  Receita,
  ContaBancaria,
  Lancamento
}; 