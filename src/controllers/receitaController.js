const { Receita } = require('../models');
const { validationResult } = require('express-validator');

const receitaController = {
  async get(req, res) {
    try {
      const receitas = await Receita.findAll({ where: { usuarioId: req.user.id } });
      res.json({ success: true, data: receitas });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async search(req, res) {
    try {
      const { id } = req.params;
      const receita = await Receita.findOne({ where: { id, usuarioId: req.user.id } });
      if (!receita) {
        return res.status(404).json({ success: false, message: 'Receita não encontrada' });
      }
      res.json({ success: true, data: receita });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async post(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      const { nome, descricao } = req.body;
      const receita = await Receita.create({ nome, descricao, usuarioId: req.user.id });
      res.status(201).json({ success: true, data: receita });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async put(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      const { id } = req.params;
      const { nome, descricao } = req.body;
      const receita = await Receita.findOne({ where: { id, usuarioId: req.user.id } });
      if (!receita) {
        return res.status(404).json({ success: false, message: 'Receita não encontrada' });
      }
      await receita.update({ nome, descricao });
      res.json({ success: true, data: receita });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const receita = await Receita.findOne({ where: { id, usuarioId: req.user.id } });
      if (!receita) {
        return res.status(404).json({ success: false, message: 'Receita não encontrada' });
      }
      await receita.destroy();
      res.json({ success: true, message: 'Receita deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  }
};

module.exports = receitaController; 