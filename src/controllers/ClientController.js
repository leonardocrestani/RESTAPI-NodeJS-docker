const ClientService = require('../services/ClientService');

class ClientController {
  static async find(req, res, next) {
    const params = req.query;
    try {
      const client = await ClientService.find(params);
      return res.status(200).json(client);
    } catch (erro) {
      next(erro);
    }
  }

  static async register(req, res, next) {
    const dados = req.body;
    try {
      const client = await ClientService.register(dados);
      return res.status(201).json(client);
    } catch (erro) {
      next(erro);
    }
  }

  static async update(req, res, next) {
    const id = req.params;
    const name = req.body.full_name;
    try {
      await ClientService.update(id, name);
      res.status(204).end();
    } catch (erro) {
      next(erro);
    }
  }

  static async remove(req, res, next) {
    const id = req.params;
    try {
      await ClientService.remove(id);
      return res.status(204).end();
    } catch (erro) {
      next(erro);
    }
  }
}

module.exports = ClientController;
