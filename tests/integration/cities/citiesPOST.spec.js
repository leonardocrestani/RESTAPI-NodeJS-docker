const request = require('supertest');
const {sequelize} = require('../../../src/models');
const app = require('../../../src/app');

describe('Cities POST', () => {
   beforeEach(async () => {
    await sequelize.models.clients.destroy({truncate: true, force: true});
      await sequelize.models.cities.destroy({truncate: true, force: true});
   });

   it('Given the route (POST)/cidades when the name and state is passed then should create a new city', async () => {
    const city = { id: 1, name: 'Nova Prata', state: 'RS' };
    const response = await request(app).post('/cidades').send(city);
    expect(response.status).toBe(201);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Nova Prata');
  }, 10000);

  it('Given the route (POST)/cidades when try to registrate a new city without state or name then should return an error', async () => {
    const city = { name: 'Nova Prata' };
    const response = await request(app).post('/cidades').send(city);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"state" is required');
  });
});