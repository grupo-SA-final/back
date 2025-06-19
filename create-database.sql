-- Script para criar o banco de dados do Sistema Financeiro
-- Execute este script no MySQL para criar o banco de dados

CREATE DATABASE IF NOT EXISTS sistema_financeiro
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE sistema_financeiro;

-- As tabelas serão criadas automaticamente pelo Sequelize
-- Este script apenas cria o banco de dados

SELECT 'Banco de dados sistema_financeiro criado com sucesso!' as message; 