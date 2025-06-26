const request = require('supertest');
const app = require('../src/index');

describe('Usuário - Fluxo Principal', () => {
  let token;
  let userId;
  const timestamp = Date.now();
  const usuario = {
    nome: 'Teste Usuário',
    email: `testeuser${timestamp}@example.com`,
    senha: 'senha123',
    telefone: '11999999999',
    documento: '22255588846',
    dataNascimento: '1990-01-01'
  };

  it('deve cadastrar um usuário com sucesso', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send(usuario);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    userId = res.body.data.id;
  });

  it('não deve cadastrar usuário com email já existente', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send(usuario);
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('deve autenticar o usuário e retornar token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: usuario.email, senha: usuario.senha });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('deve alterar a senha do usuário', async () => {
    const res = await request(app)
      .post(`/usuarios/${userId}/alterar-senha`)
      .set('Authorization', `Bearer ${token}`)
      .send({ senhaAtual: usuario.senha, novaSenha: 'novaSenha123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
}); 