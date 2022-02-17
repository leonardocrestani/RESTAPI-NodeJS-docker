const CidadeDao = require('../../src/dao/CidadeDAO.js');
const ClienteDao = require('../../src/dao/ClienteDAO.js');
const {sequelize} = require('../../src/models');

describe('Cadastro', () => {

    beforeAll(async () => {
        await sequelize.models['City'].destroy({truncate: true, force:true});
        await sequelize.models['Client'].destroy({truncate: true, force:true});
    });

    it('should create a new city with name and state', async () => {
        await CidadeDao.cadastra({nome: "Nova Prata", estado: "RS"});
    });

    it('should return city informantions when the name is passed', async () => {
        await CidadeDao.buscaPeloNome('Nova Prata');
    });

    it('should return all cities with the same state', async () => {
        await CidadeDao.buscaPeloEstado('RS');
    });

    it('should registrate a new client', async () => {
        const cidade = await CidadeDao.buscaPeloNome('Nova Prata');
        await ClienteDao.adiciona({
            nome_completo: "Leonardo",
            sexo: "M",
            data_nascimento: "05/05/2002",
            idade: 19,
            cidade_id: cidade.id
        })
    });

    it('should return client informantions when the name is passed', async () => {
        await ClienteDao.listaPeloNome('Leonardo');
    });

    it('should return client informations when the id is passed', async () => {
        const id = await ClienteDao.listaPeloNome('Leonardo');
        await ClienteDao.listarPeloId(id.id);
    });

    it('should update client name when the new name is passed', async() => {
        const id = await ClienteDao.listaPeloNome('Leonardo');
        await ClienteDao.atualiza(id.id, "Pedro");
    });

    it('should remove client', async () => {
        const id = await ClienteDao.listaPeloNome('Pedro');
        await ClienteDao.remove(id.id);
    });
})
