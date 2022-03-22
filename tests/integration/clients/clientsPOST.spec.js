const request = require('supertest');
const { sequelize } = require('../../../src/models');
const app = require('../../../src/app');

describe('Clients POST', () => {
    beforeEach(async () => {
      await sequelize.models.clients.destroy({truncate: true, force: true});
      await sequelize.models.cities.destroy({truncate: true, force: true});
    });

    it('Given the route (POST)/clientes when the personal informations is passed then should registrate a new client', async () => {
        const city = { name: 'Nova Prata', state: 'RS' };
        await request(app).post('/cidades').send(city);
        const client = {
          id: 1,
          full_name: 'Leonardo',
          gender: 'M',
          birth_date: '05/05/2002',
          city: 'Nova Prata',
        };
        const response = await request(app).post('/clientes').send(client);
        expect(response.status).toBe(201);
        expect(response.body.full_name).toBe('Leonardo');
        expect(response.body.id).toBe(1);
      }, 10000);
    
    it('Given the route (POST)/clientes when try to registrate a new client without any information then should return an error', async () => {
        const client = {
          full_name: 'Leonardo',
          birth_date: '05/05/2002',
          city: 'Nova Prata',
        };
        const response = await request(app).post('/clientes').send(client);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"gender" is required');
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