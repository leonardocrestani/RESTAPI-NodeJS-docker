const ClienteDAO = require('../dao/ClienteDAO.js');

class ClienteController {
    static async listaPeloNome(req, res) {
        const nome = req.params.nome;
        try {
            const clientes = await ClienteDAO.listaPeloNome(nome);
            return res.status(200).json(clientes);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async listaPeloId(req, res) {
        const id = req.params.id;
        try {
            const cliente = await ClienteDAO.listarPeloId(id);
            return res.status(200).json(cliente);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async cadastra(req, res) {
        const dados = req.body;
        try {
            const cliente = await ClienteDAO.adiciona(dados);
            return res.status(201).json(cliente);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async atualiza(req, res) {
        const id = req.params.id;
        const nome = req.body.nome_completo;
        try {
            await ClienteDAO.atualiza(id, nome);
            return res.status(200).end();
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async remove(req, res) {
        const id = req.params.id;
        try {
            await ClienteDAO.remove(id);
            return res.status(200).end();
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }
}

module.exports = ClienteController;