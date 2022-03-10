const db = require('../models');

class ClientDao {
    async findByName(nome) {
        return await db['clients'].findOne({raw: true, attributes: {exclude: ['id', 'created_at', 'updated_at']}, where: {nome_completo: nome}});
    }

    async findById(id) {
        return await db['clients'].findOne({raw: true, where: {id}});
    }

    async register(cliente) {
        return await db['clients'].create(cliente);
    }
    
    async update(id, nome) {
        return await db['clients'].update({nome_completo: nome}, {where: {id}});
    }

    async remove(id) {
        return await db['clients'].destroy({where: {id}});
    }
}
module.exports = new ClientDao;