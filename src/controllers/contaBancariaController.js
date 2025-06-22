const { ContaBancaria } = require('../models');
const { validationResult } = require('express-validator');

const contaBancariaController = {
  async index(req, res) {
    try {
      const contasBancarias = await ContaBancaria.findAll({ where: { usuarioId: req.user.id } });
      res.json({ success: true, data: contasBancarias });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const contaBancaria = await ContaBancaria.findOne({ where: { id, usuarioId: req.user.id } });
      if (!contaBancaria) {
        return res.status(404).json({ success: false, message: 'Conta bancária não encontrada' });
      }
      res.json({ success: true, data: contaBancaria });
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
      const { nomeBanco, tipoConta, agencia, numeroConta, saldoInicial, descricao } = req.body;
      const contaBancaria = await ContaBancaria.create({ nomeBanco, tipoConta, agencia, numeroConta, saldoInicial, descricao, usuarioId: req.user.id });
      res.status(201).json({ success: true, data: contaBancaria });
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
      const { nomeBanco, tipoConta, agencia, numeroConta, saldoInicial, descricao } = req.body;
      const contaBancaria = await ContaBancaria.findOne({ where: { id, usuarioId: req.user.id } });
      if (!contaBancaria) {
        return res.status(404).json({ success: false, message: 'Conta bancária não encontrada' });
      }
      await contaBancaria.update({ nomeBanco, tipoConta, agencia, numeroConta, saldoInicial, descricao });
      res.json({ success: true, data: contaBancaria });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const contaBancaria = await ContaBancaria.findOne({ where: { id, usuarioId: req.user.id } });
      if (!contaBancaria) {
        return res.status(404).json({ success: false, message: 'Conta bancária não encontrada' });
      }
      await contaBancaria.destroy();
      res.json({ success: true, message: 'Conta bancária deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  }
};

module.exports = contaBancariaController; 