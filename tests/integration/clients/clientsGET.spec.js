const request = require('supertest');
const app = require('../../../src/app');
const db = require('../../../src/models');

describe('Clients GET', () => {
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

});