const CidadeDAO = require('../dao/CidadeDAO.js');

class CidadeController {
    static async cadastra(req, res) {
        const dados = req.body;
        try {
            const cidade = await CidadeDAO.cadastra(dados);
            return res.status(201).json(cidade);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async buscaPeloNome(req, res) {
        const nome = req.params.nome;
        try {
            const cidade = await CidadeDAO.buscaPeloNome(nome);
            return res.status(200).json(cidade);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }

    static async buscaPeloEstado(req, res) {
        const estado = req.params.estado;
        try {
            const cidade = await CidadeDAO.buscaPeloEstado(estado);
            return res.status(200).json(cidade);
        }
        catch(erro) {
            return res.status(400).json({mensagem: erro.message});
        }
    }
}

module.exports = CidadeController;