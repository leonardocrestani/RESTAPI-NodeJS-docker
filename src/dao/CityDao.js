const db = require('../models');

class CityDao {
    async register(dados) {
        return await db['cities'].create(dados);
    }

    async findByName(nome) {
        return await db['cities'].findOne({where: {nome: nome}});
    }

    async findByState(estado) {
        return await db['cities'].findAll({attributes: {exclude: ['id', 'created_at', 'updated_at', 'estado']}, where: {estado: estado}});
    }
}

module.exports = new CityDao;