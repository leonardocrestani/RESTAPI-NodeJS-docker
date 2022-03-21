const request = require('supertest');
const app = require('../../../src/app');
const db = require('../../../src/models');

describe('Cities POST', () => {
  beforeAll(async () => {
    await db.cities.destroy({ truncate: {cascade: true}, force: true });
    await db.clients.destroy({ truncate: {cascade: true}, force: true });
  });

  it('Given the route (POST)/cidades when the name and state is passed then should create a new city', async () => {
    const cidade = { name: 'Nova Prata', state: 'RS' };
    const response = await request(app).post('/cidades').send(cidade);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
  }, 10000);

  it('Given the route (POST)/cidades when try to registrate a new city without state or name then should return an error', async () => {
    const cidade = { name: 'Nova Prata' };
    const response = await request(app).post('/cidades').send(cidade);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('\"state\" is required');
  });

});