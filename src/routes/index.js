const express = require('express');
const authRoutes = require('./auth');
const centroDeCustoRoutes = require('./centroDeCusto');
const contaBancariaRoutes = require('./contaBancaria');
const lancamentoRoutes = require('./lancamento');
const receitaRoutes = require('./receita');
const usuarioRoutes = require('./usuario');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/centros-de-custo', centroDeCustoRoutes);
router.use('/contas-bancarias', contaBancariaRoutes);
router.use('/lancamentos', lancamentoRoutes);
router.use('/receitas', receitaRoutes);
router.use('/usuarios', usuarioRoutes);

module.exports = router; 