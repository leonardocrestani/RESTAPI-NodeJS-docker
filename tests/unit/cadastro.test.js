const request = require('supertest');
const { sequelize } = require('../../src/models');
const app = require('../../src/app');

describe('Cidades e clientes', () => {
  beforeAll(async () => {
    await sequelize.models.clients.destroy({ truncate: true, force: true });
    await sequelize.models.cities.destroy({ truncate: true, force: true });
  });

  afterAll(async () => {
    await sequelize.models.clients.destroy({ truncate: true, force: true });
    await sequelize.models.cities.destroy({ truncate: true, force: true });
  });

  it('Given the route (POST)/cidades when the name and state is passed then should create a new city', async () => {
    const cidade = { nome: 'Nova Prata', estado: 'RS' };
    const response = await request(app).post('/cidades').send(cidade);
    expect(response.status).toBe(201);
    expect(response.body.id).toBe(1);
    expect(response.body.nome).toBe('Nova Prata');
  }, 10000);

  it('Given the route (POST)/cidades when try to registrate a new city without state or name then should return an error', async () => {
    const cidade = { nome: 'Nova Prata' };
    const response = await request(app).post('/cidades').send(cidade);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"estado" is required');
  });

  it('Given the route (GET)/cidades?nome when the name is passed then should return city informantions', async () => {
    const response = await request(app).get('/cidades?nome=Nova Prata');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.nome).toBe('Nova Prata');
  });

  it('Given the route (GET)/cidades?nome when try to find a city with unexistent name then should return an error', async () => {
    const response = await request(app).get('/cidades?nome=Passo Fundo');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Não foi possível encontrar a cidade informada');
  });

  it('Given the route (GET)/cidades?estado when the state is passed then should return all cities with the same state', async () => {
    const response = await request(app).get('/cidades?estado=RS');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Given the route (GET)/cidades?estado when the state is passed and the state does not have registrate cities then should return an empty array', async () => {
    const response = await request(app).get('/cidades?estado=RJ');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Given the route (GET)/cidades?estado when try to find all cities with unexistent state then should return an error', async () => {
    const response = await request(app).get('/cidades?estado=LL');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Estado informado não existe');
  });

  it('Given the route (POST)/clientes when the personal informations is passed then should registrate a new client', async () => {
    const cliente = {
      nome_completo: 'Leonardo',
      sexo: 'M',
      data_nascimento: '05/05/2002',
      cidade: 'Nova Prata',
    };
    const response = await request(app).post('/clientes').send(cliente);
    expect(response.status).toBe(201);
    expect(response.body.nome_completo).toBe('Leonardo');
    expect(response.body.id).toBe(1);
  }, 10000);

  it('Given the route (POST)/clientes when try to registrate a new client without any information then should return an error', async () => {
    const cliente = {
      nome_completo: 'Leonardo',
      data_nascimento: '05/05/2002',
      cidade: 'Nova Prata',
    };
    const response = await request(app).post('/clientes').send(cliente);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"sexo" is required');
  });

  it('Given the route (POST)/clientes when try to registrate a new client with a unexistent city then should return an error', async () => {
    const cliente = {
      nome_completo: 'Leonardo',
      sexo: 'M',
      data_nascimento: '05/05/2002',
      cidade: 'Porto Alegre',
    };
    const response = await request(app).post('/clientes').send(cliente);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Não foi possível encontrar a cidade informada');
  });

  it('Given the route (GET)/clientes?nome_completo when the name is passed then should return client informations', async () => {
    const response = await request(app).get('/clientes?nome_completo=Leonardo');
    expect(response.status).toBe(200);
    expect(response.body.nome_completo).toBe('Leonardo');
  });

  it('Given the route (GET)/cidades?nome_completo when try to find a client with unexistent name then should return an error', async () => {
    const response = await request(app).get('/clientes?nome_completo=Diogo');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Não foi possível encontrar o cliente informado');
  });

  it('Given the route (GET)/clientes?id when the ID is passed then should return client informations', async () => {
    const response = await request(app).get('/clientes?id=1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('Given the route (GET)/cidades?id when try to find a client with unexistent ID then should return an error', async () => {
    const response = await request(app).get('/clientes?id=123');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Não foi possível encontrar o cliente informado');
  });

  it('Given the route (PATCH)/clientes/:id when the new name is passed with the ID of an existing client the should update client name', async () => {
    const dados = { nome_completo: 'Pedro' };
    const response = await request(app).patch('/clientes/1').send(dados);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('Given the route (PATCH)/cidades/:id when try to update a client name with unexistent ID then should return an error', async () => {
    const dados = { nome_completo: 'Pedro' };
    const response = await request(app).patch('/clientes/123').send(dados);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Não foi possível encontrar o cliente informado');
  });

  it('Given the route (PATCH)/cidades/:id when try to update a new client without a new name then should return an error', async () => {
    const dados = {};
    const response = await request(app).patch('/clientes/1').send(dados);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"nome_completo" is required');
  });

  it('Given the route (DELETE)/clientes/:id when the ID is passed then should remove client', async () => {
    const response = await request(app).delete('/clientes/1');
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('Given the route (DELETE)/cidades/:id when try to delete a client name with unexistent ID then should return an error', async () => {
    const response = await request(app).delete('/clientes/123');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Não foi possível remover cliente');
  });
});
