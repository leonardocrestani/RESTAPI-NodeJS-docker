const ClientDao = require('../dao/ClientDao.js');

class ClientController {
    static async findByName(req, res, next) {
        const nome = req.params.nome;
        try {
            const clientes = await ClientDao.findByName(nome);
            return res.status(200).json(clientes);
        }
        catch(erro) {
            return next(erro);
        }
    }

    static async findById(req, res, next) {
        const id = req.params.id;
        try {
            const cliente = await ClientDao.findById(id);
            return res.status(200).json(cliente);
        }
        catch(erro) {
            return next(erro);
        }
    }

    static async register(req, res, next) {
        const dados = req.body;
        try {
            const cliente = await ClientDao.register(dados);
            return res.status(201).json(cliente);
        }
        catch(erro) {
            return next(erro);
        }
    }

    static async update(req, res, next) {
        const id = req.params.id;
        const nome = req.body.nome_completo;
        try {
            await ClientDao.update(id, nome);
            return res.status(204).end();
        }
        catch(erro) {
            return next(erro);
        }
    }

    static async remove(req, res, next) {
        const id = req.params.id;
        try {
            await ClientDao.remove(id);
            return res.status(204).end();
        }
        catch(erro) {
            return next(erro);
        }
    }
}

module.exports = ClientController;