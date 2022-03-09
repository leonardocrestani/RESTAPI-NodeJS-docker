const ClientService = require('../services/ClientService.js');

class ClientController {
    static async find(req, res, next) {
        const params = req.query
        try{
            const cliente = await ClientService.find(params);
            return res.status(200).json(cliente);
        }
        catch(erro) {
            next(erro);
        }
    }

    static async register(req, res, next) {
        const dados = req.body;
        try {
            const cliente = await ClientService.register(dados);
            return res.status(201).json(cliente);
        }
        catch(erro) {
            next(erro);
        }
    }

    static async update(req, res, next) {
        const id = req.params.id;
        const nome = req.body.nome_completo;
        try {
            await ClientService.update(id, nome);
            res.status(204).end();
        }
        catch(erro) {
            next(erro);
        }
    }

    static async remove(req, res, next) {
        const id = req.params.id;
        try {
            await ClientService.remove(id);
            return res.status(204).end();
        }
        catch(erro) {
            next(erro);
        }
    }

    /*static async findByName(req, res, next) {
        const nome = req.query.nome;
        try {
            const clientes = await ClientService.findByName(nome);
            return res.status(200).json(clientes);
        }
        catch(erro) {
            next(erro);
        }
    }

    static async findById(req, res, next) {
        const id = req.query.id;
        try {
            const cliente = await ClientService.findById(id);
            return res.status(200).json(cliente);
        }
        catch(erro) {
            next(erro);
        }
    }*/
}

module.exports = ClientController;