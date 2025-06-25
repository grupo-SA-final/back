const express = require('express');
const { body } = require('express-validator');
const lancamentoController = require('../controllers/lancamentoController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const lancamentoValidation = [
  body('tipo')
    .isIn(['pagamento', 'recebimento']).withMessage('Tipo deve ser: pagamento ou recebimento'),
  body('data')
    .isDate().withMessage('Data inválida')
    .custom((value) => {
      const data = new Date(value);
      const hoje = new Date();
      if (data > hoje) throw new Error('Data não pode ser no futuro');
      return true;
    }),
  body('valor')
    .isFloat({ min: 0.01 }).withMessage('Valor deve ser um número positivo'),
  body('descricao')
    .optional().isLength({ max: 255 }).withMessage('Descrição deve ter no máximo 255 caracteres'),
  body('contaBancariaId')
    .isInt({ min: 1 }).withMessage('ID da conta bancária deve ser um número inteiro positivo'),
  body('receitaId')
    .if(body('tipo').equals('recebimento'))
    .isInt({ min: 1 }).withMessage('ID da receita deve ser um número inteiro positivo'),
  body('centroDeCustoId')
    .if(body('tipo').equals('pagamento'))
    .isInt({ min: 1 }).withMessage('ID do centro de custo deve ser um número inteiro positivo')
];

router.get('/', lancamentoController.index);
router.get('/:id', lancamentoController.show);
router.post('/', lancamentoValidation, lancamentoController.store);
router.put('/:id', lancamentoValidation, lancamentoController.update);
router.delete('/:id', lancamentoController.destroy);

module.exports = router; 