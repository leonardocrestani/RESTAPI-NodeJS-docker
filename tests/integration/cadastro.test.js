const CidadeDao = require('../../src/dao/CidadeDAO.js');
const ClienteDao = require('../../src/dao/ClienteDAO.js');
const {sequelize} = require('../../src/models');

describe('Cadastro', () => {

    beforeAll(async () => {
        await sequelize.models['Client'].destroy({truncate: true, force:true});
        await sequelize.models['City'].destroy({truncate: true, force:true});
    });

    afterAll(async () => {
        await sequelize.models['Client'].destroy({truncate: true, force:true});
        await sequelize.models['City'].destroy({truncate: true, force:true});
    });

    it('should create a new city with name and state', async () => {
        const cidade = await CidadeDao.cadastra({id:1, nome: "Nova Prata", estado: "RS"});
        expect(cidade.nome).toBe('Nova Prata');
        expect(cidade.id).toBe(1);
    }, 10000);

    it('should return city informantions when the name is passed', async () => {
        const cidade = await CidadeDao.buscaPeloNome('Nova Prata');
        expect(cidade.nome).toBe('Nova Prata');
        expect(cidade.id).toBe(1);
    });

    it('should return all cities with the same state', async () => {
        const cidades = await CidadeDao.buscaPeloEstado('RS');
        expect(cidades.length).toBeGreaterThan(0);
    });

    it('should registrate a new client', async () => {
        await ClienteDao.adiciona({
            id: 1,
            nome_completo: "Leonardo",
            sexo: "M",
            data_nascimento: "05/05/2002",
            idade: 19,
            cidade_id: 1
        });
    }, 10000);

    it('should return client informations when the name is passed', async () => {
        const cliente = await ClienteDao.listaPeloNome('Leonardo');
        expect(cliente.nome_completo).toBe('Leonardo');
    });

    it('should return client informations when the id is passed', async () => {
        const cliente = await ClienteDao.listarPeloId(1);
        console.log(cliente, "BBBBBBBBBB")
        expect(cliente.nome_completo).toBe('Leonardo');
    });

    it('should update client name when the new name is passed', async() => {
        await ClienteDao.atualiza(1, "Pedro");
        const cliente = await ClienteDao.listarPeloId(1);
        console.log(cliente, "AAAAAAAA")
        expect(cliente.id).toBe(1);
        expect(cliente.nome_completo).toBe('Pedro');
    });

    it('should remove client', async () => {
        await ClienteDao.remove(1);
        const cliente = await ClienteDao.listarPeloId(1);
        expect(cliente).toBeNull();
    });
})
