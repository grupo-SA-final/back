const express = require('express');
const { body } = require('express-validator');
const receitaController = require('../controllers/receitaController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const receitaValidation = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('descricao')
    .optional().isLength({ max: 255 }).withMessage('Descrição deve ter no máximo 255 caracteres')
];

router.get('/', receitaController.index);
router.get('/:id', receitaController.show);
router.post('/', receitaValidation, receitaController.store);
router.put('/:id', receitaValidation, receitaController.update);
router.delete('/:id', receitaController.destroy);

module.exports = router; 