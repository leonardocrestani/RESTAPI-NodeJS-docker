const CityDao = require('../dao/CityDao.js');

class CidadeController {
    static async register(req, res) {
        const dados = req.body;
        try {
            const cidade = await CityDao.register(dados);
            return res.status(201).json(cidade);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async findByName(req, res) {
        const nome = req.params.nome;
        try {
            const cidade = await CityDao.findByName(nome);
            return res.status(200).json(cidade);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async findByState(req, res) {
        const estado = req.params.estado;
        try {
            const cidade = await CityDao.findByState(estado);
            return res.status(200).json(cidade);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }
}

module.exports = CidadeController;