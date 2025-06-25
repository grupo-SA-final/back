# Sistema Financeiro - Backend

Backend completo para sistema financeiro com CRUD de usuários, centros de custo, receitas, contas bancárias e lançamentos.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd back
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
- Certifique-se de que o MySQL está rodando
- Crie um banco de dados chamado `sistema_financeiro`
- As credenciais padrão são:
  - Usuário: `root`
  - Senha: `1234`
  - Host: `localhost`
  - Porta: `3306`

4. **Inicie o servidor**
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## 📊 Estrutura do Banco de Dados

### Tabelas criadas automaticamente:

1. **usuarios** - Usuários do sistema
2. **centros_de_custo** - Centros de custo para pagamentos
3. **receitas** - Tipos de receita
4. **contas_bancarias** - Contas bancárias
5. **lancamentos** - Lançamentos financeiros

## 🔐 Autenticação

### Registro de Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "telefone": "(11) 99999-9999",
  "documento": "123.456.789-00",
  "dataNascimento": "1990-01-01"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "documento": "123.456.789-00",
    "dataNascimento": "1990-01-01"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 📡 Endpoints da API

### 🔐 Autenticação (não precisa de token)
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login

### 💰 Centros de Custo (precisa de token)
- `GET /api/centros-de-custo` - Listar todos
- `GET /api/centros-de-custo/:id` - Buscar por ID
- `POST /api/centros-de-custo` - Criar novo
- `PUT /api/centros-de-custo/:id` - Atualizar
- `DELETE /api/centros-de-custo/:id` - Deletar

### 💵 Receitas (precisa de token)
- `GET /api/receitas` - Listar todas
- `GET /api/receitas/:id` - Buscar por ID
- `POST /api/receitas` - Criar nova
- `PUT /api/receitas/:id` - Atualizar
- `DELETE /api/receitas/:id` - Deletar

### 🏦 Contas Bancárias (precisa de token)
- `GET /api/contas-bancarias` - Listar todas
- `GET /api/contas-bancarias/:id` - Buscar por ID
- `POST /api/contas-bancarias` - Criar nova
- `PUT /api/contas-bancarias/:id` - Atualizar
- `DELETE /api/contas-bancarias/:id` - Deletar

### 📊 Lançamentos (precisa de token)
- `GET /api/lancamentos` - Listar todos
- `GET /api/lancamentos/:id` - Buscar por ID
- `POST /api/lancamentos` - Criar novo
- `PUT /api/lancamentos/:id` - Atualizar
- `DELETE /api/lancamentos/:id` - Deletar

## 🔑 Como usar o Token

Para acessar endpoints protegidos, inclua o token no header:
```http
Authorization: Bearer <seu-token-aqui>
```

## 📝 Exemplos de Uso

### Criar Centro de Custo
```http
POST /api/centros-de-custo
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Alimentação",
  "descricao": "Gastos com alimentação"
}
```

### Criar Conta Bancária
```http
POST /api/contas-bancarias
Authorization: Bearer <token>
Content-Type: application/json

{
  "nomeBanco": "Banco do Brasil",
  "tipoConta": "corrente",
  "agencia": "1234",
  "numeroConta": "12345-6",
  "descricao": "Conta principal"
}
```

### Criar Lançamento de Recebimento
```http
POST /api/lancamentos
Authorization: Bearer <token>
Content-Type: application/json

{
  "tipo": "recebimento",
  "data": "2024-01-15",
  "valor": 5000.00,
  "descricao": "Salário janeiro",
  "contaBancariaId": 1,
  "receitaId": 1
}
```

### Criar Lançamento de Pagamento
```http
POST /api/lancamentos
Authorization: Bearer <token>
Content-Type: application/json

{
  "tipo": "pagamento",
  "data": "2024-01-16",
  "valor": 150.00,
  "descricao": "Supermercado",
  "contaBancariaId": 1,
  "centroDeCustoId": 1
}
```

## 🏗️ Estrutura do Projeto

```
src/
├── config/
│   ├── database.js      # Configuração do Sequelize
│   └── jwt.js          # Configuração do JWT
├── controllers/
│   ├── authController.js
│   ├── centroDeCustoController.js
│   ├── receitaController.js
│   ├── contaBancariaController.js
│   └── lancamentoController.js
├── middlewares/
│   └── auth.js         # Middleware de autenticação
├── models/
│   ├── Usuario.js
│   ├── CentroDeCusto.js
│   ├── Receita.js
│   ├── ContaBancaria.js
│   ├── Lancamento.js
│   └── index.js        # Associações entre modelos
├── routes/
│   ├── auth.js
│   ├── centroDeCusto.js
│   ├── receita.js
│   ├── contaBancaria.js
│   ├── lancamento.js
│   └── index.js        # Rotas principais
└── index.js            # Arquivo principal
```

## 🚨 Validações

O sistema inclui validações para:
- Campos obrigatórios
- Formato de email
- Tipos de conta bancária (corrente, poupança, investimento)
- Tipos de lançamento (pagamento, recebimento)
- Valores numéricos positivos
- Datas válidas
- Relacionamentos obrigatórios

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Autenticação via JWT
- Validação de dados em todas as rotas
- Middleware de autenticação para rotas protegidas

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para controle financeiro eficiente!**

# Regras de Negócio do Sistema

## Usuário
- Cadastro de usuário exige nome, email único, senha, telefone, documento (CPF único e válido) e data de nascimento.
- Senha é armazenada de forma criptografada.
- Login exige email e senha válidos.
- Usuário pode atualizar seus dados (exceto senha/documento diretamente).
- Usuário pode alterar sua senha informando a senha atual.
- Usuário pode ser deletado.

## Conta Bancária
- Cada usuário pode cadastrar múltiplas contas bancárias.
- Conta bancária exige nome do banco, tipo (corrente, poupança, investimento), agência, número da conta e vínculo ao usuário.
- Conta bancária pode ser atualizada ou deletada apenas pelo dono.

## Centro de Custo
- Cada usuário pode cadastrar múltiplos centros de custo.
- Centro de custo exige nome e vínculo ao usuário.
- Centro de custo pode ser atualizado ou deletado apenas pelo dono.

## Receita
- Cada usuário pode cadastrar múltiplas receitas.
- Receita exige nome e vínculo ao usuário.
- Receita pode ser atualizada ou deletada apenas pelo dono.

## Lançamento
- Lançamento pode ser de tipo 'pagamento' ou 'recebimento'.
- Lançamento exige data, valor, conta bancária e vínculo ao usuário.
- Lançamento do tipo 'recebimento' exige vínculo a uma receita.
- Lançamento do tipo 'pagamento' exige vínculo a um centro de custo.
- Lançamento pode ser atualizado ou deletado apenas pelo dono.
- Não é possível criar lançamento para conta bancária, receita ou centro de custo inexistentes.

# Cenários de Teste por Regra de Negócio

## Usuário
- Cadastro com dados válidos
- Cadastro com email já existente
- Cadastro com CPF inválido
- Cadastro com campos obrigatórios ausentes
- Login com credenciais válidas
- Login com senha incorreta
- Login com email não cadastrado
- Atualização de dados do usuário
- Alteração de senha com senha atual correta
- Alteração de senha com senha atual incorreta
- Exclusão de usuário existente
- Exclusão de usuário inexistente

## Conta Bancária
- Cadastro de conta bancária com dados válidos
- Cadastro de conta bancária com campos obrigatórios ausentes
- Atualização de conta bancária existente
- Atualização de conta bancária inexistente
- Exclusão de conta bancária existente
- Exclusão de conta bancária inexistente
- Listagem de contas bancárias do usuário

## Centro de Custo
- Cadastro de centro de custo com dados válidos
- Cadastro de centro de custo com campos obrigatórios ausentes
- Atualização de centro de custo existente
- Atualização de centro de custo inexistente
- Exclusão de centro de custo existente
- Exclusão de centro de custo inexistente
- Listagem de centros de custo do usuário

## Receita
- Cadastro de receita com dados válidos
- Cadastro de receita com campos obrigatórios ausentes
- Atualização de receita existente
- Atualização de receita inexistente
- Exclusão de receita existente
- Exclusão de receita inexistente
- Listagem de receitas do usuário

## Lançamento
- Cadastro de lançamento de recebimento com receita existente
- Cadastro de lançamento de pagamento com centro de custo existente
- Cadastro de lançamento com conta bancária inexistente
- Cadastro de lançamento de recebimento sem receita
- Cadastro de lançamento de pagamento sem centro de custo
- Atualização de lançamento existente
- Atualização de lançamento inexistente
- Exclusão de lançamento existente
- Exclusão de lançamento inexistente
- Listagem de lançamentos do usuário

---
