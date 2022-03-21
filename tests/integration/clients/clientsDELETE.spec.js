const request = require('supertest');
const app = require('../../../src/app');
const db = require('../../../src/models');

describe('Clients DELETE', () => {
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