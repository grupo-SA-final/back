const { Receita } = require('../models');
const { validationResult } = require('express-validator');

const receitaController = {
  async index(req, res) {
    try {
      const receitas = await Receita.findAll({
        order: [['nome', 'ASC']]
      });

      res.json({
        success: true,
        data: receitas
      });
    } catch (error) {
      console.error('Erro ao listar receitas:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      
      const receita = await Receita.findByPk(id);
      
      if (!receita) {
        return res.status(404).json({ 
          success: false, 
          message: 'Receita não encontrada' 
        });
      }

      res.json({
        success: true,
        data: receita
      });
    } catch (error) {
      console.error('Erro ao buscar receita:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async store(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { nome, descricao } = req.body;

      const receita = await Receita.create({
        nome,
        descricao
      });

      res.status(201).json({
        success: true,
        message: 'Receita criada com sucesso',
        data: receita
      });
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { id } = req.params;
      const { nome, descricao } = req.body;

      const receita = await Receita.findByPk(id);
      
      if (!receita) {
        return res.status(404).json({ 
          success: false, 
          message: 'Receita não encontrada' 
        });
      }

      await receita.update({
        nome,
        descricao
      });

      res.json({
        success: true,
        message: 'Receita atualizada com sucesso',
        data: receita
      });
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const receita = await Receita.findByPk(id);
      
      if (!receita) {
        return res.status(404).json({ 
          success: false, 
          message: 'Receita não encontrada' 
        });
      }

      await receita.destroy();

      res.json({
        success: true,
        message: 'Receita deletada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar receita:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  }
};

module.exports = receitaController; 