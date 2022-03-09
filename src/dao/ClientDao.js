const db = require('../models');

class ClientDao {
    async findByName(nome) {
        return await db['clients'].findOne({raw: true, attributes: {exclude: ['id', 'created_at', 'updated_at']}, where: {nome_completo: nome}});
    }

    async findById(idCliente) {
        return await db['clients'].findOne({raw: true, where: {id: idCliente}});
    }

    async register(cliente) {
        return await db['clients'].create(cliente);
    }
    
    async update(idCliente, valor) {
        return await db['clients'].update({nome_completo: valor}, {where: {id: idCliente}});
    }

    async remove(idCliente) {
        return await db['clients'].destroy({where: {id: idCliente}});
    }
}
module.exports = new ClientDao;