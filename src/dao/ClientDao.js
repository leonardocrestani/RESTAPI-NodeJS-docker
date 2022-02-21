const { Client } = require('../models');
const NotFound = require('../errors/NotFound.js')

class ClientDao {
    async findByName(nome) {
        const cliente = await Client.findOne({raw: true, attributes: {exclude: ['id', 'created_at', 'updated_at']}, where: {nome_completo: nome}});
        if(!cliente) {
            throw new NotFound('cliente');
        }
        return cliente;
    }

    async findById(idCliente) {
        const cliente = await Client.findOne({where: {id: idCliente}});
        if(!cliente) {
            throw new NotFound('cliente');
        }
        return cliente;
    }

    async register(cliente) {
        const existe = await Client.findOne({where: {nome_completo: cliente.nome_completo}});
        if(existe) {
            throw new Error('Cliente ja existente');
        }
        let data = cliente.data_nascimento.split('/');
        data = `${data[2]}-${data[1]}-${data[0]}`;
        cliente.data_nascimento = data;
        return await Client.create(cliente);
    }
    
    async update(idCliente, valor) {
        const operacao = await Client.update({nome_completo: valor}, {where: {id: idCliente}});
        if(!operacao) {
            throw new Error('Nao foi possivel atualizar o nome do cliente');
        }
        return operacao;
    }

    async remove(idCliente) {
        const operacao = await Client.destroy({where: {id: idCliente}});
        if(!operacao) {
            throw new Error('Nao foi possivel remover cliente');
        }
        return;
    }
}
module.exports = new ClientDao;