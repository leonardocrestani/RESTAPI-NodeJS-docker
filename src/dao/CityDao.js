const { City } = require('../models');

class CityDao {
    async register(dados) {
        return await City.create(dados);
    }

    async findByName(nome) {
        const cidade = await City.findOne({where: {nome: nome}});
        if(!cidade) {
            throw new Error('Nao foi possivel encontrar a cidade informada');
        }
        return cidade;
    }

    async findByState(estado) {
        return await City.findAll({attributes: {exclude: ['id', 'created_at', 'updated_at', 'estado']}, where: {estado: estado}});
    }
}

module.exports = new CityDao;