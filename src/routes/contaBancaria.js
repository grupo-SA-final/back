const express = require('express');
const { body } = require('express-validator');
const contaBancariaController = require('../controllers/contaBancariaController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const contaBancariaValidation = [
  body('nomeBanco')
    .notEmpty().withMessage('Nome do banco é obrigatório')
    .isLength({ min: 3, max: 100 }).withMessage('Nome do banco deve ter entre 3 e 100 caracteres'),
  body('tipoConta')
    .isIn(['corrente', 'poupanca', 'investimento']).withMessage('Tipo de conta deve ser: corrente, poupança ou investimento'),
  body('agencia')
    .notEmpty().withMessage('Agência é obrigatória')
    .matches(/^\d{1,10}$/).withMessage('Agência deve conter apenas números (até 10 dígitos)'),
  body('numeroConta')
    .notEmpty().withMessage('Número da conta é obrigatório')
    .matches(/^\d{1,20}(-\d{1,2})?$/).withMessage('Número da conta deve ser válido (ex: 12345-6)'),
  body('saldoInicial')
    .optional().isFloat({ min: 0 }).withMessage('Saldo inicial deve ser um número positivo'),
  body('descricao')
    .optional().isLength({ max: 255 }).withMessage('Descrição deve ter no máximo 255 caracteres')
];

router.get('/', contaBancariaController.index);
router.get('/:id', contaBancariaController.show);
router.post('/', contaBancariaValidation, contaBancariaController.store);
router.put('/:id', contaBancariaValidation, contaBancariaController.update);
router.delete('/:id', contaBancariaController.destroy);

module.exports = router; 