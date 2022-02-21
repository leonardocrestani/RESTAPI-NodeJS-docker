const { City } = require('../models');
const NotFound = require('../errors/NotFound.js');

class CityDao {
    async register(dados) {
        const existe = await City.findOne({where: {nome: dados.nome}});
        if(existe) {
            throw new Error('Cidade ja existente');
        }
        return await City.create(dados);
    }

    async findByName(nome) {
        const cidade = await City.findOne({where: {nome: nome}});
        if(!cidade) {
            throw new NotFound('cidade');
        }
        return cidade;
    }

    async findByState(estado) {
        return await City.findAll({attributes: {exclude: ['id', 'created_at', 'updated_at', 'estado']}, where: {estado: estado}});
    }
}

module.exports = new CityDao;