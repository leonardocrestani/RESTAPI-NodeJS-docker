const CityDao = require('../dao/CityDao.js');

class CityController {
    static async register(req, res, next) {
        const dados = req.body;
        try {
            const cidade = await CityDao.register(dados);
            return res.status(201).json(cidade);
        }
        catch(erro) {
            return next(erro);
        }
    }

    static async findByName(req, res, next) {
        const nome = req.params.nome;
        try {
            const cidade = await CityDao.findByName(nome);
            return res.status(200).json(cidade);
        }
        catch(erro) {
            return next(erro);
        }
    }

    static async findByState(req, res, next) {
        const estado = req.params.estado;
        try {
            const cidade = await CityDao.findByState(estado);
            return res.status(200).json(cidade);
        }
        catch(erro) {
            return next(erro);
        }
    }
}

module.exports = CityController;