const request = require('supertest');
const app = require('../src/index');

describe('Conta Bancária - Fluxo Principal', () => {
  let token;
  let contaId;
  beforeAll(async () => {
    // Cria usuário e autentica
    await request(app).post('/usuario').send({
      nome: 'Conta Teste',
      email: 'conta@teste.com',
      senha: 'senha123',
      telefone: '11999999999',
      documento: '12345678901',
      dataNascimento: '1990-01-01'
    });
    const res = await request(app).post('/auth/login').send({
      email: 'conta@teste.com', senha: 'senha123'
    });
    token = res.body.token;
  });

  it('deve cadastrar uma conta bancária', async () => {
    const res = await request(app)
      .post('/conta-bancaria')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nomeBanco: 'Banco Teste',
        tipoConta: 'corrente',
        agencia: '0001',
        numeroConta: '12345-6',
        saldoInicial: 1000,
        descricao: 'Conta de teste'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    contaId = res.body.data.id;
  });

  it('deve listar contas bancárias', async () => {
    const res = await request(app)
      .get('/conta-bancaria')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('deve excluir uma conta bancária', async () => {
    const res = await request(app)
      .delete(`/conta-bancaria/${contaId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
}); 