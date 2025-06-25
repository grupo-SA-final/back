const request = require('supertest');
const app = require('../src/index');

describe('Centro de Custo - Fluxo Principal', () => {
  let token;
  let centroId;
  beforeAll(async () => {
    await request(app).post('/usuario').send({
      nome: 'Centro Teste',
      email: 'centro@teste.com',
      senha: 'senha123',
      telefone: '11999999999',
      documento: '12345678902',
      dataNascimento: '1990-01-01'
    });
    const res = await request(app).post('/auth/login').send({
      email: 'centro@teste.com', senha: 'senha123'
    });
    token = res.body.token;
  });

  it('deve cadastrar um centro de custo', async () => {
    const res = await request(app)
      .post('/centro-de-custo')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Centro Teste', descricao: 'Centro de teste' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    centroId = res.body.data.id;
  });

  it('deve listar centros de custo', async () => {
    const res = await request(app)
      .get('/centro-de-custo')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('deve excluir um centro de custo', async () => {
    const res = await request(app)
      .delete(`/centro-de-custo/${centroId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
}); 