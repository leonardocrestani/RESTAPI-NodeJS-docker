const db = require('../models');

class CityDao {
    async find(param) {
        return await db['cities'].findOne({where: param});
    }

    async findByState(estado) {
        return await db['cities'].findAll({attributes: {exclude: ['id', 'created_at', 'updated_at', 'estado']}, where: estado});
    }
    
    async register(dados) {
        return await db['cities'].create(dados);
    }
}

module.exports = new CityDao;