const request = require('supertest');
const app = require('../../../src/app');
const db = require('../../../src/models');

describe('Clients POST', () => {
  beforeAll(async () => {
    await db.cities.destroy({ truncate: {cascade: true}, force: true });
    await db.clients.destroy({ truncate: {cascade: true}, force: true });
    const cidade = { name: 'Nova Prata', state: 'RS' };
    await request(app).post('/cidades').send(cidade);
  });

  it('Given the route (POST)/clientes when the personal informations is passed then should registrate a new client', async () => {
    const client = {
      full_name: 'Leonardo',
      gender: 'M',
      birth_date: '05/05/2002',
      city: 'Nova Prata',
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

});