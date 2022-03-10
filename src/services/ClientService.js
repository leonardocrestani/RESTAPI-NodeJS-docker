const ClientDao = require('../dao/ClientDao.js');
const NotFound = require('../errors/NotFound.js');
const InvalidParameters = require('../errors/InvalidParameters.js');
const CityService = require('./CityService.js');
const calculateAge = require('../utils/calculateAge.js');

class ClientService {
    async find(param) {
        if(Object.keys(param)[0] === 'nome' && Object.keys(param).length === 1) {
            const client = await ClientDao.findByName(param.nome);
            if(!client) {
                throw new NotFound('Não foi possível encontrar o cliente informado');
            }
            let data = client.data_nascimento.split('-');
            client.idade = calculateAge(...data);
            return client;
        }
        if(Object.keys(param)[0] === 'id' && Object.keys(param).length === 1) {
            const client = await ClientDao.findById(param.id);
            if(!client) {
                throw new NotFound('Não foi possível encontrar o cliente informado');
            }
            let data = client.data_nascimento.split('-');
            client.idade = calculateAge(...data);
            return client;
        }
        else {
            throw new InvalidParameters('Parametros invalidos');
        }
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
        let data = cliente.data_nascimento.split('/');
        data = `${data[2]}-${data[1]}-${data[0]}`;
        cliente.data_nascimento = data;
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
        console.log(operacao)
        if(!operacao) {
            throw new Error('Não foi possível remover cliente');
        }
        return operacao;
    }
}

module.exports = new ClientService();