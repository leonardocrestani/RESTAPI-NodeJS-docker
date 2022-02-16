const { Client } = require('../models');

class ClienteDAO {
    async listaTodos() {
        return await Client.findAll({raw: true});
    }

    async adiciona(cliente) {
        let data = cliente.data_nascimento.split('/');
        data = `${data[2]}-${data[1]}-${data[0]}`;
        cliente.data_nascimento = data;
        return await Client.create(cliente);
    }

    async listarPeloId(idCliente) {
        const cliente = await Client.findOne({raw:true, where: {id: idCliente}});
        return cliente;
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