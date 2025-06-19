const { ContaBancaria } = require('../models');
const { validationResult } = require('express-validator');

const contaBancariaController = {
  async index(req, res) {
    try {
      const contasBancarias = await ContaBancaria.findAll({
        order: [['nomeBanco', 'ASC']]
      });

      res.json({
        success: true,
        data: contasBancarias
      });
    } catch (error) {
      console.error('Erro ao listar contas bancárias:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      
      const contaBancaria = await ContaBancaria.findByPk(id);
      
      if (!contaBancaria) {
        return res.status(404).json({ 
          success: false, 
          message: 'Conta bancária não encontrada' 
        });
      }

      res.json({
        success: true,
        data: contaBancaria
      });
    } catch (error) {
      console.error('Erro ao buscar conta bancária:', error);
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

      const { nomeBanco, tipoConta, agencia, numeroConta, descricao } = req.body;

      const contaBancaria = await ContaBancaria.create({
        nomeBanco,
        tipoConta,
        agencia,
        numeroConta,
        descricao
      });

      res.status(201).json({
        success: true,
        message: 'Conta bancária criada com sucesso',
        data: contaBancaria
      });
    } catch (error) {
      console.error('Erro ao criar conta bancária:', error);
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
      const { nomeBanco, tipoConta, agencia, numeroConta, descricao } = req.body;

      const contaBancaria = await ContaBancaria.findByPk(id);
      
      if (!contaBancaria) {
        return res.status(404).json({ 
          success: false, 
          message: 'Conta bancária não encontrada' 
        });
      }

      await contaBancaria.update({
        nomeBanco,
        tipoConta,
        agencia,
        numeroConta,
        descricao
      });

      res.json({
        success: true,
        message: 'Conta bancária atualizada com sucesso',
        data: contaBancaria
      });
    } catch (error) {
      console.error('Erro ao atualizar conta bancária:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const contaBancaria = await ContaBancaria.findByPk(id);
      
      if (!contaBancaria) {
        return res.status(404).json({ 
          success: false, 
          message: 'Conta bancária não encontrada' 
        });
      }

      await contaBancaria.destroy();

      res.json({
        success: true,
        message: 'Conta bancária deletada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar conta bancária:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  }
};

module.exports = contaBancariaController; 