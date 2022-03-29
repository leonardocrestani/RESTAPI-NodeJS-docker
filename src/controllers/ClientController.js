const ClientService = require('../services/ClientService');

class ClientController {
  async find(req, res, next) {
    const params = req.query;
    try {
      const client = await ClientService.find(params);
      return res.status(200).json(client);
    } catch (erro) {
      next(erro);
    }
  }

  async register(req, res, next) {
    const dados = req.body;
    try {
      const client = await ClientService.register(dados);
      return res.status(201).json(client);
    } catch (erro) {
      next(erro);
    }
  }

  async update(req, res, next) {
    const id = req.params;
    const name = req.body.full_name;
    try {
      const client = await ClientService.update(id, name);
      return res.status(200).json(client);
    } catch (erro) {
      next(erro);
    }
  }

  async remove(req, res, next) {
    const id = req.params;
    try {
      await ClientService.remove(id);
      return res.status(204).end();
    } catch (erro) {
      next(erro);
    }
  }
}

module.exports = new ClientController();
