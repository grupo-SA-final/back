const { CentroDeCusto } = require('../models');
const { validationResult } = require('express-validator');

const centroDeCustoController = {
  async index(req, res) {
    try {
      const centrosDeCusto = await CentroDeCusto.findAll({ where: { usuarioId: req.user.id } });
      res.json({ success: true, data: centrosDeCusto });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const centroDeCusto = await CentroDeCusto.findOne({ where: { id, usuarioId: req.user.id } });
      if (!centroDeCusto) {
        return res.status(404).json({ success: false, message: 'Centro de custo não encontrado' });
      }
      res.json({ success: true, data: centroDeCusto });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async store(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      const { nome, descricao } = req.body;
      const centroDeCusto = await CentroDeCusto.create({ nome, descricao, usuarioId: req.user.id });
      res.status(201).json({ success: true, data: centroDeCusto });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      const { id } = req.params;
      const { nome, descricao } = req.body;
      const centroDeCusto = await CentroDeCusto.findOne({ where: { id, usuarioId: req.user.id } });
      if (!centroDeCusto) {
        return res.status(404).json({ success: false, message: 'Centro de custo não encontrado' });
      }
      await centroDeCusto.update({ nome, descricao });
      res.json({ success: true, data: centroDeCusto });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const centroDeCusto = await CentroDeCusto.findOne({ where: { id, usuarioId: req.user.id } });
      if (!centroDeCusto) {
        return res.status(404).json({ success: false, message: 'Centro de custo não encontrado' });
      }
      await centroDeCusto.destroy();
      res.json({ success: true, message: 'Centro de custo deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  }
};

module.exports = centroDeCustoController; 