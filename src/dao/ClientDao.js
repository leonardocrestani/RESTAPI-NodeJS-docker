const db = require('../models');
const NotFound = require('../errors/NotFound.js')

class ClientDao {
    async findByName(nome) {
        const cliente = await db['clients'].findOne({raw: true, attributes: {exclude: ['id', 'created_at', 'updated_at']}, where: {nome_completo: nome}});
        if(!cliente) {
            throw new NotFound('Não foi possível encontrar o cliente informado');
        }
        return cliente;
    }

    async findById(idCliente) {
        const cliente = await db['clients'].findOne({where: {id: idCliente}});
        if(!cliente) {
            throw new NotFound('Não foi possível encontrar o cliente informado');
        }
        return cliente;
    }

    async register(cliente) {
        const existeCidade = await db['cities'].findOne({where: {id:cliente.cidade_id}});
        if(!existeCidade) {
            throw new NotFound('Cidade inexistente, não foi possível cadastrar o cliente');
        }
        const existeCliente = await db['clients'].findOne({where: {nome_completo: cliente.nome_completo}});
        if(existeCliente) {
            throw new Error('Cliente ja existente');
        }
        let data = cliente.data_nascimento.split('/');
        data = `${data[2]}-${data[1]}-${data[0]}`;
        cliente.data_nascimento = data;
        return await db['clients'].create(cliente);
    }
    
    async update(idCliente, valor) {
        const operacao = await db['clients'].update({nome_completo: valor}, {where: {id: idCliente}});
        if(!operacao) {
            throw new Error('Não foi possível atualizar o nome do cliente');
        }
        return operacao;
    }

    async remove(idCliente) {
        const operacao = await db['clients'].destroy({where: {id: idCliente}});
        if(!operacao) {
            throw new Error('Não foi possível remover cliente');
        }
        return;
    }
}
module.exports = new ClientDao;