const request = require('supertest');
const app = require('../../../src/app');
const db = require('../../../src/models');

describe('Clients POST', () => {
  beforeAll(async () => {
    await db.cities.destroy({ truncate: {cascade: true}, force: true });
    await db.clients.destroy({ truncate: {cascade: true}, force: true });
    const cidade = { name: 'Passo Fundo', state: 'RS' };
    await request(app).post('/cidades').send(cidade);
  });

  it('Given the route (POST)/clientes when the personal informations is passed then should registrate a new client', async () => {
    const client = {
      full_name: 'Leonardo',
      gender: 'M',
      birth_date: '05/05/2002',
      city: 'Passo Fundo',
    };
    const response = await request(app).post('/clientes').send(client);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('full_name');
  }, 10000);

  it('Given the route (POST)/clientes when try to registrate a new client without any information then should return an error', async () => {
    const client = {
      full_name: 'Leonardo',
      birth_date: '05/05/2002',
      city: 'Nova Prata',
    };
    const response = await request(app).post('/clientes').send(client);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('\"gender\" is required');
  });

  it('Given the route (POST)/clientes when try to registrate a new client with a unexistent city then should return an error', async () => {
    const client = {
      full_name: 'Leonardo',
      gender: 'M',
      birth_date: '05/05/2002',
      city: 'Porto Alegre',
    };
    const response = await request(app).post('/clientes').send(client);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Informed city not found');
  });

  it('Given the route (GET)/clientes?nome_completo when the name is passed then should return client informations', async () => {
    const response = await request(app).get('/clientes?full_name=Leonardo');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('full_name');
  });

  it('Given the route (GET)/cidades?nome_completo when try to find a client with unexistent name then should return an error', async () => {
    const response = await request(app).get('/clientes?full_name=Diogo');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Informed client not found');
  });

  it('Given the route (GET)/clientes?id when the ID is passed then should return client informations', async () => {
    const response = await request(app).get('/clientes?id=1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Given the route (GET)/cidades?id when try to find a client with unexistent ID then should return an error', async () => {
    const response = await request(app).get('/clientes?id=123');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Informed client not found');
  });

  it('Given the route (PATCH)/clientes/:id when the new name is passed with the ID of an existing client the should update client name', async () => {
    const dados = { full_name: 'Pedro' };
    const response = await request(app).patch('/clientes/1').send(dados);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('Given the route (PATCH)/cidades/:id when try to update a client name with unexistent ID then should return an error', async () => {
    const dados = { full_name: 'Pedro' };
    const response = await request(app).patch('/clientes/123').send(dados);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Could not update client');
  });

  it('Given the route (PATCH)/cidades/:id when try to update a new client without a new name then should return an error', async () => {
    const dados = {};
    const response = await request(app).patch('/clientes/1').send(dados);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"full_name" is required');
  });

  it('Given the route (DELETE)/clientes/:id when the ID is passed then should remove client', async () => {
    const response = await request(app).delete('/clientes/1');
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('Given the route (DELETE)/cidades/:id when try to delete a client name with unexistent ID then should return an error', async () => {
    const response = await request(app).delete('/clientes/123');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Could not remove client');
  });

});