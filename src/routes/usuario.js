const express = require('express');
const { body } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const usuarioValidation = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
  body('documento').notEmpty().withMessage('Documento (CPF) é obrigatório'),
  body('dataNascimento').isDate().withMessage('Data de nascimento inválida')
];

const usuarioUpdateValidation = [
  body('nome').optional().notEmpty().withMessage('Nome é obrigatório'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('telefone').optional().notEmpty().withMessage('Telefone é obrigatório'),
  body('dataNascimento').optional().isDate().withMessage('Data de nascimento inválida'),
  body('documento').not().exists().withMessage('Documento não pode ser alterado')
];

const senhaValidation = [
  body('senhaAtual').notEmpty().withMessage('Senha atual é obrigatória'),
  body('novaSenha').isLength({ min: 6 }).withMessage('Nova senha deve ter pelo menos 6 caracteres')
];

router.get('/', usuarioController.index);
router.get('/:id', usuarioController.show);
router.post('/', usuarioValidation, usuarioController.store);
router.put('/:id', usuarioUpdateValidation, usuarioController.update);
router.delete('/:id', usuarioController.destroy);
router.post('/:id/alterar-senha', senhaValidation, usuarioController.alterarSenha);

module.exports = router; 