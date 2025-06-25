const express = require('express');
const { body } = require('express-validator');
const centroDeCustoController = require('../controllers/centroDeCustoController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const centroDeCustoValidation = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
  body('descricao')
    .optional().isLength({ max: 255 }).withMessage('Descrição deve ter no máximo 255 caracteres')
];

router.get('/', centroDeCustoController.index);
router.get('/:id', centroDeCustoController.show);
router.post('/', centroDeCustoValidation, centroDeCustoController.store);
router.put('/:id', centroDeCustoValidation, centroDeCustoController.update);
router.delete('/:id', centroDeCustoController.destroy);

module.exports = router; 