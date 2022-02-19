const ClientDao = require('../dao/ClientDao.js');

class ClienteController {
    static async findByName(req, res) {
        const nome = req.params.nome;
        try {
            const clientes = await ClientDao.findByName(nome);
            return res.status(200).json(clientes);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async findById(req, res) {
        const id = req.params.id;
        try {
            const cliente = await ClientDao.findById(id);
            return res.status(200).json(cliente);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async register(req, res) {
        const dados = req.body;
        try {
            const cliente = await ClientDao.register(dados);
            return res.status(201).json(cliente);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async update(req, res) {
        const id = req.params.id;
        const nome = req.body.nome_completo;
        try {
            await ClientDao.update(id, nome);
            return res.status(200).end();
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async remove(req, res) {
        const id = req.params.id;
        try {
            await ClientDao.remove(id);
            return res.status(200).end();
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }
}

module.exports = ClienteController;