const CityService = require('../services/CityService.js');

class CityController {
    static async find(req, res, next) {
        const params = req.query
        try{
            const cidade = await CityService.find(params);
            return res.status(200).json(cidade);
        }
        catch(erro) {
            next(erro);
        }
    }

    static async register(req, res, next) {
        const dados = req.body;
        try {
            const cidade = await CityService.register(dados);
            return res.status(201).json(cidade);
        }
        catch(erro) {
            next(erro);
        }
    }
}

module.exports = CityController;