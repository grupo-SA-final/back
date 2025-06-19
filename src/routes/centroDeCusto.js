const express = require('express');
const { body } = require('express-validator');
const centroDeCustoController = require('../controllers/centroDeCustoController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const centroDeCustoValidation = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('descricao').optional()
];

router.get('/', centroDeCustoController.index);
router.get('/:id', centroDeCustoController.show);
router.post('/', centroDeCustoValidation, centroDeCustoController.store);
router.put('/:id', centroDeCustoValidation, centroDeCustoController.update);
router.delete('/:id', centroDeCustoController.destroy);

module.exports = router; 