const request = require('supertest');
const app = require('../../../src/app');
const db = require('../../../src/models');

describe('Clients PATCH', () => {
  beforeAll(async () => {
    await db.cities.destroy({ truncate: {cascade: true}, force: true });
    await db.clients.destroy({ truncate: {cascade: true}, force: true });
    const cidade = { name: 'Nova Prata', state: 'RS' };
    await request(app).post('/cidades').send(cidade);
    const cliente = {
      full_name: 'Leonardo',
      gender: 'M',
      birth_date: '05/05/2002',
      city: 'Nova Prata',
    };
    await request(app).post('/clientes').send(cliente);
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

});