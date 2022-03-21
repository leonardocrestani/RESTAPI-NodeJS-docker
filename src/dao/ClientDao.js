const db = require('../models');

class ClientDao {
  async find(param) {
    return await db.clients.findOne({ raw: true, where: param });
  }

  async register(cliente) {
    return await db.clients.create(cliente);
  }

  async update(id, nome) {
    return await db.clients.update({ full_name: nome }, { raw:true, where: id });
  }

  async remove(id) {
    return await db.clients.destroy({ where: id });
  }
}
module.exports = new ClientDao();
