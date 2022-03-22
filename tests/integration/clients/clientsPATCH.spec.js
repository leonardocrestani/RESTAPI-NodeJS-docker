const request = require('supertest');
const { sequelize } = require('../../../src/models');
const app = require('../../../src/app');

describe('Clients PATCH', () => {
    beforeEach(async () => {
        await sequelize.models.clients.destroy({truncate: true, force: true});
        await sequelize.models.cities.destroy({truncate: true, force: true});
    });

    it('Given the route (PATCH)/clientes/:id when the new name is passed with the ID of an existing client the should update client name', async () => {
        const city = { name: 'Nova Prata', state: 'RS' };
        await request(app).post('/cidades').send(city);
        const client = {
          id: 1,
          full_name: 'Leonardo',
          gender: 'M',
          birth_date: '05/05/2002',
          city: 'Nova Prata',
        };
        await request(app).post('/clientes').send(client);
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
        const city = { name: 'Nova Prata', state: 'RS' };
        await request(app).post('/cidades').send(city);
        const client = {
          id: 1,
          full_name: 'Leonardo',
          gender: 'M',
          birth_date: '05/05/2002',
          city: 'Nova Prata',
        };
        await request(app).post('/clientes').send(client);
        const dados = {};
        const response = await request(app).patch('/clientes/1').send(dados);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"full_name" is required');
    });
});