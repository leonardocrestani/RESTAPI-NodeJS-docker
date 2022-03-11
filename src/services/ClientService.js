const ClientDao = require('../dao/ClientDao.js');
const CityService = require('./CityService.js');
const NotFound = require('../errors/NotFound.js');
const UnprocessableEntity = require('../errors/UnprocessableEntity.js');
const calculateAge = require('../utils/calculateAge.js');
const formatDate = require('../utils/formatDate.js');

class ClientService {
    async find(param) {
        let client;
        if(Object.keys(param).length === 1) {
            client = await ClientDao.find(param);
        }
        else {
            throw new UnprocessableEntity('Parametros invalidos passar id ou nome');
        }
        if(!client) {
            throw new NotFound('Não foi possível encontrar o cliente informado');
        }
        let data = client.data_nascimento.split('-');
        client.idade = calculateAge(...data);
        return client;
    }

    async register(cliente) {
        const cidade = await CityService.find({nome: cliente.cidade});
        if(!cidade) {
            throw new NotFound('Cidade inexistente, não foi possível cadastrar o cliente');
        }
        cliente.cidade = cidade.id
        const existeCliente = await ClientDao.findByName(cliente.nome_completo);
        if(existeCliente) {
            throw new Error('Cliente ja existente');
        }
        cliente.data_nascimento = formatDate(cliente.data_nascimento);
        const register = await ClientDao.register(cliente);
        return register;
    }

    async update(idCliente, valor) {
        const client = await ClientDao.findById(idCliente);
        if(!client) {
            throw new NotFound('Não foi possível encontrar o cliente informado');
        }
        const operacao = await ClientDao.update(idCliente, valor);
        return operacao;
    }

    async remove(idCliente) {
        const operacao = await ClientDao.remove(idCliente);
        if(!operacao) {
            throw new Error('Não foi possível remover cliente');
        }
        return operacao;
    }
}

module.exports = new ClientService();