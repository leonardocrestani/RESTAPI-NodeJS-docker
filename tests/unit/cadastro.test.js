const CityService = require('../../src/services/CityService.js');
const ClientService = require('../../src/services/ClientService.js');
const {sequelize} = require('../../src/models');

describe('Cidades e clientes', () => {

    beforeAll(async () => {
        await sequelize.models['clients'].destroy({truncate: true, force:true});
        await sequelize.models['cities'].destroy({truncate: true, force:true});
    });

    afterAll(async () => {
        await sequelize.models['clients'].destroy({truncate: true, force:true});
        await sequelize.models['cities'].destroy({truncate: true, force:true});
    });

    it('should create a new city with name and state', async () => {
        const cidade = await CityService.register({id:1, nome: "Nova Prata", estado: "RS"});
        expect(cidade.nome).toBe('Nova Prata');
        expect(cidade.id).toBe(1);
    }, 10000);

    it('should return city informantions when the name is passed', async () => {
        const cidade = await CityService.find({nome: 'Nova Prata'});
        expect(cidade.nome).toBe('Nova Prata');
        expect(cidade.id).toBe(1);
    });

    it('should return all cities with the same state', async () => {
        const cidades = await CityService.find({estado: 'RS'});
        expect(cidades.length).toBeGreaterThan(0);
    });

    it('should registrate a new client', async () => {
        await ClientService.register({
            id: 1,
            nome_completo: "Leonardo",
            sexo: "M",
            data_nascimento: "05/05/2002",
            cidade: "Nova Prata"
        });
    }, 10000);

    it('should return client informations when the name is passed', async () => {
        const cliente = await ClientService.find({nome: 'Leonardo'});
        expect(cliente.nome_completo).toBe('Leonardo');
    });

    it('should return client informations when the id is passed', async () => {
        const cliente = await ClientService.find({id: 1});
        expect(cliente.nome_completo).toBe('Leonardo');
    });

    it('should update client name when the new name is passed', async() => {
        await ClientService.update(1, "Pedro");
        const cliente = await ClientService.find({id: 1});
        expect(cliente.id).toBe(1);
        expect(cliente.nome_completo).toBe("Pedro");
    });

    it('should remove client', async () => {
        await ClientService.remove(1);
    });
})
