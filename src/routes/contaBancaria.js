const express = require('express');
const { body } = require('express-validator');
const contaBancariaController = require('../controllers/contaBancariaController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const contaBancariaValidation = [
  body('nomeBanco').notEmpty().withMessage('Nome do banco é obrigatório'),
  body('tipoConta').isIn(['corrente', 'poupanca', 'investimento']).withMessage('Tipo de conta deve ser: corrente, poupança ou investimento'),
  body('agencia').notEmpty().withMessage('Agência é obrigatória'),
  body('numeroConta').notEmpty().withMessage('Número da conta é obrigatório'),
  body('descricao').optional()
];

router.get('/', contaBancariaController.index);
router.get('/:id', contaBancariaController.show);
router.post('/', contaBancariaValidation, contaBancariaController.store);
router.put('/:id', contaBancariaValidation, contaBancariaController.update);
router.delete('/:id', contaBancariaController.destroy);

module.exports = router; 