const request = require('supertest');
const { sequelize } = require('../../../src/models');
const app = require('../../../src/app');

describe('Clients DELETE', () => {
    beforeEach(async () => {
        await sequelize.models.clients.destroy({truncate: true, force: true});
        await sequelize.models.cities.destroy({truncate: true, force: true});
    });

    it('Given the route (DELETE)/clientes/:id when the ID is passed then should remove client', async () => {
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