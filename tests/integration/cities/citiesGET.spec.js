const request = require('supertest');
const {sequelize} = require('../../../src/models');
const app = require('../../../src/app');

describe('Cities GET', () => {
   beforeEach(async () => {
    await sequelize.models.clients.destroy({truncate: true, force: true});
    await sequelize.models.cities.destroy({truncate: true, force: true});
   });

   it('Given the route (GET)/cidades?name when the name is passed then should return city informantions', async () => {
    const city = { id:1, name: 'Nova Prata', state: 'RS' };
    await request(app).post('/cidades').send(city);
    const response = await request(app).get('/cidades?name=Nova Prata');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Nova Prata');
  });

  it('Given the route (GET)/cidades?name when try to find a city with unexistent name then should return an error', async () => {
    const response = await request(app).get('/cidades?name=Porto Alegre');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Informed city not found');
  });

  it('Given the route (GET)/cidades?state when the state is passed then should return all cities with the same state', async () => {
    const city = { name: 'Nova Prata', state: 'RS' };
    await request(app).post('/cidades').send(city);
    const response = await request(app).get('/cidades?state=RS');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Given the route (GET)/cidades?state when the state is passed and the state does not have registrate cities then should return an empty array', async () => {
    const response = await request(app).get('/cidades?state=RJ');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Given the route (GET)/cidades?state when try to find all cities with unexistent state then should return an error', async () => {
    const response = await request(app).get('/cidades?state=LL');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Informed state does not exist');
  });

});