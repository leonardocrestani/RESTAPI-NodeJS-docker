const request = require('supertest');
const app = require('../../../src/app');
const db = require('../../../src/models');

describe('Cities GET', () => {
  beforeAll(async () => {
    await db.cities.destroy({ truncate: {cascade: true}, force: true });
    await db.clients.destroy({ truncate: {cascade: true}, force: true });
    const cidade = { name: 'Nova Prata', state: 'RS' };
    await request(app).post('/cidades').send(cidade);
  });

  it('Given the route (GET)/cidades?nome when the name is passed then should return city informantions', async () => {
    const response = await request(app).get('/cidades?name=Nova Prata');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
  });

  it('Given the route (GET)/cidades?nome when try to find a city with unexistent name then should return an error', async () => {
    const response = await request(app).get('/cidades?name=Passo Fundo');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Informed city not found');
  });

  it('Given the route (GET)/cidades?estado when the state is passed then should return all cities with the same state', async () => {
    const response = await request(app).get('/cidades?state=RS');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Given the route (GET)/cidades?estado when the state is passed and the state does not have registrate cities then should return an empty array', async () => {
    const response = await request(app).get('/cidades?state=RJ');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Given the route (GET)/cidades?estado when try to find all cities with unexistent state then should return an error', async () => {
    const response = await request(app).get('/cidades?state=LL');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Informed state does not exist');
  });

});