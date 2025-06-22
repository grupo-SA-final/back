const { Lancamento, ContaBancaria, Receita, CentroDeCusto } = require('../models');
const { validationResult } = require('express-validator');

const lancamentoController = {
  async index(req, res) {
    try {
      const lancamentos = await Lancamento.findAll({
        where: { usuarioId: req.user.id },
        include: [
          {
            model: ContaBancaria,
            as: 'ContaBancaria',
            attributes: ['id', 'nomeBanco', 'tipoConta', 'agencia', 'numeroConta']
          },
          {
            model: Receita,
            as: 'Receita',
            attributes: ['id', 'nome']
          },
          {
            model: CentroDeCusto,
            as: 'CentroDeCusto',
            attributes: ['id', 'nome']
          }
        ],
        order: [['data', 'DESC']]
      });

      res.json({
        success: true,
        data: lancamentos
      });
    } catch (error) {
      console.error('Erro ao listar lançamentos:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      
      const lancamento = await Lancamento.findOne({
        where: { id, usuarioId: req.user.id },
        include: [
          {
            model: ContaBancaria,
            as: 'ContaBancaria',
            attributes: ['id', 'nomeBanco', 'tipoConta', 'agencia', 'numeroConta']
          },
          {
            model: Receita,
            as: 'Receita',
            attributes: ['id', 'nome']
          },
          {
            model: CentroDeCusto,
            as: 'CentroDeCusto',
            attributes: ['id', 'nome']
          }
        ]
      });
      
      if (!lancamento) {
        return res.status(404).json({ 
          success: false, 
          message: 'Lançamento não encontrado' 
        });
      }

      res.json({
        success: true,
        data: lancamento
      });
    } catch (error) {
      console.error('Erro ao buscar lançamento:', error);
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

      const { tipo, data, valor, descricao, contaBancariaId, receitaId, centroDeCustoId } = req.body;

      if (tipo === 'recebimento' && !receitaId) {
        return res.status(400).json({
          success: false,
          message: 'Receita é obrigatória para lançamentos de recebimento'
        });
      }

      if (tipo === 'pagamento' && !centroDeCustoId) {
        return res.status(400).json({
          success: false,
          message: 'Centro de custo é obrigatório para lançamentos de pagamento'
        });
      }

      const contaBancaria = await ContaBancaria.findByPk(contaBancariaId);
      if (!contaBancaria) {
        return res.status(400).json({
          success: false,
          message: 'Conta bancária não encontrada'
        });
      }

      if (receitaId) {
        const receita = await Receita.findByPk(receitaId);
        if (!receita) {
          return res.status(400).json({
            success: false,
            message: 'Receita não encontrada'
          });
        }
      }

      if (centroDeCustoId) {
        const centroDeCusto = await CentroDeCusto.findByPk(centroDeCustoId);
        if (!centroDeCusto) {
          return res.status(400).json({
            success: false,
            message: 'Centro de custo não encontrado'
          });
        }
      }

      const lancamento = await Lancamento.create({
        tipo,
        data,
        valor,
        descricao,
        contaBancariaId,
        receitaId,
        centroDeCustoId,
        usuarioId: req.user.id
      });

      const lancamentoCriado = await Lancamento.findByPk(lancamento.id, {
        include: [
          {
            model: ContaBancaria,
            as: 'ContaBancaria',
            attributes: ['id', 'nomeBanco', 'tipoConta', 'agencia', 'numeroConta']
          },
          {
            model: Receita,
            as: 'Receita',
            attributes: ['id', 'nome']
          },
          {
            model: CentroDeCusto,
            as: 'CentroDeCusto',
            attributes: ['id', 'nome']
          }
        ]
      });

      res.status(201).json({
        success: true,
        message: 'Lançamento criado com sucesso',
        data: lancamentoCriado
      });
    } catch (error) {
      console.error('Erro ao criar lançamento:', error);
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
      const { tipo, data, valor, descricao, contaBancariaId, receitaId, centroDeCustoId } = req.body;

      const lancamento = await Lancamento.findOne({ where: { id, usuarioId: req.user.id } });
      
      if (!lancamento) {
        return res.status(404).json({ 
          success: false, 
          message: 'Lançamento não encontrado' 
        });
      }

      if (tipo === 'recebimento' && !receitaId) {
        return res.status(400).json({
          success: false,
          message: 'Receita é obrigatória para lançamentos de recebimento'
        });
      }

      if (tipo === 'pagamento' && !centroDeCustoId) {
        return res.status(400).json({
          success: false,
          message: 'Centro de custo é obrigatório para lançamentos de pagamento'
        });
      }

      const contaBancaria = await ContaBancaria.findByPk(contaBancariaId);
      if (!contaBancaria) {
        return res.status(400).json({
          success: false,
          message: 'Conta bancária não encontrada'
        });
      }

      if (receitaId) {
        const receita = await Receita.findByPk(receitaId);
        if (!receita) {
          return res.status(400).json({
            success: false,
            message: 'Receita não encontrada'
          });
        }
      }

      if (centroDeCustoId) {
        const centroDeCusto = await CentroDeCusto.findByPk(centroDeCustoId);
        if (!centroDeCusto) {
          return res.status(400).json({
            success: false,
            message: 'Centro de custo não encontrado'
          });
        }
      }

      await lancamento.update({
        tipo,
        data,
        valor,
        descricao,
        contaBancariaId,
        receitaId,
        centroDeCustoId
      });

      const lancamentoAtualizado = await Lancamento.findByPk(id, {
        include: [
          {
            model: ContaBancaria,
            as: 'ContaBancaria',
            attributes: ['id', 'nomeBanco', 'tipoConta', 'agencia', 'numeroConta']
          },
          {
            model: Receita,
            as: 'Receita',
            attributes: ['id', 'nome']
          },
          {
            model: CentroDeCusto,
            as: 'CentroDeCusto',
            attributes: ['id', 'nome']
          }
        ]
      });

      res.json({
        success: true,
        message: 'Lançamento atualizado com sucesso',
        data: lancamentoAtualizado
      });
    } catch (error) {
      console.error('Erro ao atualizar lançamento:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const lancamento = await Lancamento.findOne({ where: { id, usuarioId: req.user.id } });
      if (!lancamento) {
        return res.status(404).json({ success: false, message: 'Lançamento não encontrado' });
      }
      await lancamento.destroy();
      res.json({ success: true, message: 'Lançamento deletado com sucesso' });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};

module.exports = lancamentoController; 