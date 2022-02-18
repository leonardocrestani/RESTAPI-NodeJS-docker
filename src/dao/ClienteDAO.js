const { Client } = require('../models');

class ClienteDAO {
    async listaPeloNome(nome) {
        return await Client.findOne({raw: true, attributes: {exclude: ['id', 'created_at', 'updated_at']}, where: {nome_completo: nome}});
    }

    async listarPeloId(idCliente) {
        const cliente = await Client.findOne({where: {id: idCliente}});
        return cliente;
    }

    async adiciona(cliente) {
        const existe = await Client.findOne({where: {nome_completo: cliente.nome_completo}});
        if(existe) {
            throw new Error('Cliente ja existente');
        }
        let data = cliente.data_nascimento.split('/');
        data = `${data[2]}-${data[1]}-${data[0]}`;
        cliente.data_nascimento = data;
        return await Client.create(cliente);
    }
    
    async atualiza(idCliente, valor) {
        const operacao = await Client.update({nome_completo: valor}, {where: {id: idCliente}});
        if(!operacao) {
            throw new Error('Nao foi possivel atualizar o nome do cliente');
        }
        return;
    }

    async remove(idCliente) {
        const operacao = await Client.destroy({where: {id: idCliente}});
        if(!operacao) {
            throw new Error('Nao foi possivel remover cliente');
        }
        return;
    }
}
module.exports = new ClienteDAO;