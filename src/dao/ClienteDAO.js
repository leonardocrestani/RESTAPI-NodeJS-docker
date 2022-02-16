const { Client } = require('../models');

class ClienteDAO {
    async listaTodos() {
        return await Client.findAll({raw: true});
    }

    async adiciona(cliente) {
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