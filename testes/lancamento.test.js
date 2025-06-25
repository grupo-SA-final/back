const request = require('supertest');
const app = require('../src/index');

describe('Lançamento - Fluxo Principal', () => {
  let token;
  let contaId;
  let receitaId;
  let centroId;
  let lancamentoId;
  beforeAll(async () => {
    // Cria usuário e autentica
    await request(app).post('/usuario').send({
      nome: 'Lancamento Teste',
      email: 'lancamento@teste.com',
      senha: 'senha123',
      telefone: '11999999999',
      documento: '12345678904',
      dataNascimento: '1990-01-01'
    });
    const res = await request(app).post('/auth/login').send({
      email: 'lancamento@teste.com', senha: 'senha123'
    });
    token = res.body.token;
    // Cria conta bancária
    const conta = await request(app).post('/conta-bancaria').set('Authorization', `Bearer ${token}`).send({
      nomeBanco: 'Banco Teste', tipoConta: 'corrente', agencia: '0001', numeroConta: '12345-6', saldoInicial: 1000, descricao: 'Conta de teste'
    });
    contaId = conta.body.data.id;
    // Cria receita
    const receita = await request(app).post('/receita').set('Authorization', `Bearer ${token}`).send({ nome: 'Receita Teste', descricao: 'Receita de teste' });
    receitaId = receita.body.data.id;
    // Cria centro de custo
    const centro = await request(app).post('/centro-de-custo').set('Authorization', `Bearer ${token}`).send({ nome: 'Centro Teste', descricao: 'Centro de teste' });
    centroId = centro.body.data.id;
  });

  it('deve cadastrar um lançamento de recebimento', async () => {
    const res = await request(app)
      .post('/lancamento')
      .set('Authorization', `Bearer ${token}`)
      .send({ tipo: 'recebimento', data: '2024-01-01', valor: 100, descricao: 'Recebimento', contaBancariaId: contaId, receitaId });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    lancamentoId = res.body.data.id;
  });

  it('deve cadastrar um lançamento de pagamento', async () => {
    const res = await request(app)
      .post('/lancamento')
      .set('Authorization', `Bearer ${token}`)
      .send({ tipo: 'pagamento', data: '2024-01-02', valor: 50, descricao: 'Pagamento', contaBancariaId: contaId, centroDeCustoId: centroId });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('deve listar lançamentos', async () => {
    const res = await request(app)
      .get('/lancamento')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('deve excluir um lançamento', async () => {
    const res = await request(app)
      .delete(`/lancamento/${lancamentoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
}); 