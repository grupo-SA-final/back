const { Usuario } = require('../models');
const { generateToken } = require('../config/jwt');
const { validationResult } = require('express-validator');

const authController = {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { nome, email, senha, telefone, documento, dataNascimento } = req.body;

      const usuarioExistente = await Usuario.findOne({ 
        where: { email } 
      });

      if (usuarioExistente) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email já cadastrado' 
        });
      }

      const usuario = await Usuario.create({
        nome,
        email,
        senha,
        telefone,
        documento,
        dataNascimento
      });

      const token = generateToken({ 
        id: usuario.id, 
        email: usuario.email 
      });

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
          documento: usuario.documento,
          dataNascimento: usuario.dataNascimento
        },
        token
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        let message = 'Já existe um usuário cadastrado com este dado.';
        if (error.errors && error.errors[0].path === 'documento') {
          message = 'Já existe um usuário cadastrado com este documento (CPF).';
        } else if (error.errors && error.errors[0].path === 'email') {
          message = 'Já existe um usuário cadastrado com este email.';
        }
        return res.status(400).json({
          success: false,
          message
        });
      }
      console.error('Erro no registro:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  },

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ 
        where: { email } 
      });

      if (!usuario) {
        return res.status(401).json({ 
          success: false, 
          message: 'Email ou senha inválidos' 
        });
      }

      const senhaValida = await usuario.verificarSenha(senha);
      
      if (!senhaValida) {
        return res.status(401).json({ 
          success: false, 
          message: 'Email ou senha inválidos' 
        });
      }

      const token = generateToken({ 
        id: usuario.id, 
        email: usuario.email 
      });

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
          documento: usuario.documento,
          dataNascimento: usuario.dataNascimento
        },
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }
  }
};

module.exports = authController; 