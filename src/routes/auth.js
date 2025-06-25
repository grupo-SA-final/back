const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

function isCPF(value) {
  value = value.replace(/[^0-9]/g, '');
  if (value.length !== 11 || /^([0-9])\1+$/.test(value)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(value.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(value.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(value.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(value.substring(10, 11))) return false;
  return true;
}

const registerValidation = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('email')
    .isEmail().withMessage('Email inválido'),
  body('senha')
    .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('telefone')
    .notEmpty().withMessage('Telefone é obrigatório')
    .matches(/^\d{10,11}$/).withMessage('Telefone deve ter 10 ou 11 dígitos numéricos'),
  body('documento')
    .notEmpty().withMessage('Documento (CPF) é obrigatório')
    .custom(isCPF).withMessage('CPF inválido'),
  body('dataNascimento')
    .isDate().withMessage('Data de nascimento inválida')
    .custom((value) => {
      const data = new Date(value);
      const hoje = new Date();
      if (data > hoje) throw new Error('Data de nascimento não pode ser no futuro');
      return true;
    })
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória')
];

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

module.exports = router; 