const ClientDao = require('../dao/ClientDao.js');
const NotFound = require('../errors/NotFound.js');
const InvalidParameters = require('../errors/InvalidParameters.js');
const CityService = require('./CityService.js');

class ClientService {
    async find(param) {
        if(Object.keys(param)[0] === 'nome' && Object.keys(param).length === 1) {
            const client = await ClientDao.findByName(param.nome);
            if(!client) {
                throw new NotFound('Não foi possível encontrar o cliente informado');
            }
            let data = client.data_nascimento.split('-');
            client.idade = this._calculaIdade(...data);
            return client;
        }
        if(Object.keys(param)[0] === 'id' && Object.keys(param).length === 1) {
            const client = await ClientDao.findById(param.id);
            if(!client) {
                throw new NotFound('Não foi possível encontrar o cliente informado');
            }
            let data = client.data_nascimento.split('-');
            client.idade = this._calculaIdade(...data);
            return client;
        }
        else {
            throw new InvalidParameters('Parametros invalidos');
        }
    }

    async register(cliente) {
        const cidade = await CityService.findByName(cliente.cidade);
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
        const operacao = await ClientDao.update(idCliente, valor);
        if(!operacao) {
            throw new Error('Não foi possível atualizar o nome do cliente');
        }
        return operacao;
    }

    async remove(idCliente) {
        const operacao = await ClientDao.remove(idCliente);
        if(!operacao) {
            throw new Error('Não foi possível remover cliente');
        }
        return;
    }

    _calculaIdade(ano, mes, dia) {
        const dataAtual = new Date();
        const diaAtual = dataAtual.getDate();
        const mesAtual = dataAtual.getMonth() + 1;
        const anoAtual = dataAtual.getFullYear();
        let idade = anoAtual - ano;
        if(mes > mesAtual || dia > diaAtual) {
            idade = idade - 1
        }
        return idade;
    }

    /*async findByName(nome) {
        const client = await ClientDao.findByName(nome);
        if(!client) {
            throw new NotFound('Não foi possível encontrar o cliente informado');
        }
        let data = client.data_nascimento.split('-');
        client.idade = this._calculaIdade(...data);
        return client;
    }

    async findById(id) {
        const client = await ClientDao.findById(id);
        if(!client) {
            throw new NotFound('Não foi possível encontrar o cliente informado');
        }
        let data = client.data_nascimento.split('-');
        client.idade = this._calculaIdade(...data);
        return client;
    }*/
}

module.exports = new ClientService();