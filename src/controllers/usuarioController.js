const { Usuario } = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

function validarCPF(cpf) {
  cpf = cpf.replace(/[^0-9]/g, '');
  if (cpf.length !== 11 || /^(0-9)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

const usuarioController = {
  async index(req, res) {
    const usuarios = await Usuario.findAll({ attributes: { exclude: ['senha'] } });
    res.json({ success: true, data: usuarios });
  },
  async show(req, res) {
    const usuario = await Usuario.findByPk(req.params.id, { attributes: { exclude: ['senha'] } });
    if (!usuario) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    res.json({ success: true, data: usuario });
  },
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { nome, email, senha, telefone, documento, dataNascimento } = req.body;
    if (!validarCPF(documento)) return res.status(400).json({ success: false, message: 'CPF inválido' });
    try {
      const usuario = await Usuario.create({ nome, email, senha, telefone, documento, dataNascimento });
      res.status(201).json({ success: true, data: { ...usuario.toJSON(), senha: undefined } });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { id } = req.params;
    const { nome, email, telefone, dataNascimento } = req.body;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
      await usuario.update({ nome, email, telefone, dataNascimento });
      res.json({ success: true, data: { ...usuario.toJSON(), senha: undefined } });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  async destroy(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
      await usuario.destroy();
      res.json({ success: true, message: 'Usuário deletado com sucesso' });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  async alterarSenha(req, res) {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
      const senhaCorreta = await usuario.verificarSenha(senhaAtual);
      if (!senhaCorreta) return res.status(400).json({ success: false, message: 'Senha atual incorreta' });
      usuario.senha = novaSenha;
      await usuario.save();
      res.json({ success: true, message: 'Senha alterada com sucesso' });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};

module.exports = usuarioController; 