const request = require('supertest');
const { sequelize } = require('../../../src/models');
const app = require('../../../src/app');

describe('Clients GET', () => {
    beforeEach(async () => {
        await sequelize.models.clients.destroy({truncate: true, force: true});
        await sequelize.models.cities.destroy({truncate: true, force: true});
    });

    it('Given the route (GET)/clientes?full_name when the name is passed then should return client informations', async () => {
        const city = { name: 'Nova Prata', state: 'RS' };
        await request(app).post('/cidades').send(city);
        const client = {
          full_name: 'Leonardo',
          gender: 'M',
          birth_date: '05/05/2002',
          city: 'Nova Prata',
        };
        await request(app).post('/clientes').send(client);
        const response = await request(app).get('/clientes?full_name=Leonardo');
        expect(response.status).toBe(200);
        expect(response.body.full_name).toBe('Leonardo');
    });
    
    it('Given the route (GET)/cidades?full_name when try to find a client with unexistent name then should return an error', async () => {
        const response = await request(app).get('/clientes?full_name=Diogo');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Informed client not found');
    });
    
    it('Given the route (GET)/clientes?id when the ID is passed then should return client informations', async () => {
        const city = { id: 1, name: 'Nova Prata', state: 'RS' };
        await request(app).post('/cidades').send(city);
        const client = {
          id: 1,
          full_name: 'Leonardo',
          gender: 'M',
          birth_date: '05/05/2002',
          city: 'Nova Prata',
        };
        await request(app).post('/clientes').send(client);
        const response = await request(app).get('/clientes?id=1');
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
    
    it('Given the route (GET)/cidades?id when try to find a client with unexistent ID then should return an error', async () => {
        const response = await request(app).get('/clientes?id=1234');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Informed client not found');
    });
});