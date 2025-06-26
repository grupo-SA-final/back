const request = require('supertest');
const app = require('../src/index');

describe('Receita - Fluxo Principal', () => {
  let token;
  let receitaId;
  beforeAll(async () => {
    await request(app).post('/usuarios').send({
      nome: 'Receita Teste',
      email: 'receita@teste.com',
      senha: 'senha123',
      telefone: '11999999999',
      documento: '33366699957',
      dataNascimento: '1990-01-01'
    });
    const res = await request(app).post('/auth/login').send({
      email: 'receita@teste.com', senha: 'senha123'
    });
    token = res.body.token;
  });

  it('deve cadastrar uma receita', async () => {
    const res = await request(app)
      .post('/receitas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Receita Teste', descricao: 'Receita de teste' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    receitaId = res.body.data.id;
  });

  it('deve listar receitas', async () => {
    const res = await request(app)
      .get('/receitas')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('deve excluir uma receita', async () => {
    const res = await request(app)
      .delete(`/receitas/${receitaId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
}); 