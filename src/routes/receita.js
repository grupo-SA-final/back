const express = require('express');
const { body } = require('express-validator');
const receitaController = require('../controllers/receitaController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const receitaValidation = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('descricao').optional()
];

router.get('/', receitaController.index);
router.get('/:id', receitaController.show);
router.post('/', receitaValidation, receitaController.store);
router.put('/:id', receitaValidation, receitaController.update);
router.delete('/:id', receitaController.destroy);

module.exports = router; 