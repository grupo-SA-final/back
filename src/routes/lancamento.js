const express = require('express');
const { body } = require('express-validator');
const lancamentoController = require('../controllers/lancamentoController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const lancamentoValidation = [
  body('tipo').isIn(['pagamento', 'recebimento']).withMessage('Tipo deve ser: pagamento ou recebimento'),
  body('data').isDate().withMessage('Data inválida'),
  body('valor').isFloat({ min: 0.01 }).withMessage('Valor deve ser um número positivo'),
  body('descricao').optional(),
  body('contaBancariaId').isInt().withMessage('ID da conta bancária deve ser um número inteiro'),
  body('receitaId').if(body('tipo').equals('recebimento')).isInt().withMessage('ID da receita deve ser um número inteiro'),
  body('centroDeCustoId').if(body('tipo').equals('pagamento')).isInt().withMessage('ID do centro de custo deve ser um número inteiro')
];

router.get('/', lancamentoController.index);
router.get('/:id', lancamentoController.show);
router.post('/', lancamentoValidation, lancamentoController.store);
router.put('/:id', lancamentoValidation, lancamentoController.update);
router.delete('/:id', lancamentoController.destroy);

module.exports = router; 