-- Script para criar o banco de dados do Sistema Financeiro
-- Execute este script no MySQL para criar o banco de dados

CREATE DATABASE IF NOT EXISTS sistema_financeiro
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE sistema_financeiro;

-- As tabelas serão criadas automaticamente pelo Sequelize
-- Este script apenas cria o banco de dados

SELECT 'Banco de dados sistema_financeiro criado com sucesso!' as message;

ALTER TABLE lancamentos ADD COLUMN usuarioId INT NOT NULL;
ALTER TABLE lancamentos ADD CONSTRAINT fk_lancamento_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(id);

ALTER TABLE centros_de_custo ADD COLUMN usuarioId INT NOT NULL;
ALTER TABLE centros_de_custo ADD CONSTRAINT fk_centro_custo_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(id);

ALTER TABLE receitas ADD COLUMN usuarioId INT NOT NULL;
ALTER TABLE receitas ADD CONSTRAINT fk_receita_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(id);

ALTER TABLE contas_bancarias ADD COLUMN usuarioId INT NOT NULL;
ALTER TABLE contas_bancarias ADD CONSTRAINT fk_conta_bancaria_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(id); 