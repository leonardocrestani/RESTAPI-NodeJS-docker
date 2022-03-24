const ClientDao = require('../dao/ClientDao');
const CityService = require('./CityService');
const NotFound = require('../errors/NotFound');
const UnprocessableEntity = require('../errors/UnprocessableEntity');
const calculateAge = require('../utils/calculateAge');
const formatDate = require('../utils/formatDate');

class ClientService {
  async find(param) {
    const client = await ClientDao.find(param);
    if (!client) {
      throw new NotFound('Informed client not found');
    }
    const date = client.birth_date.split('-');
    client.age = calculateAge(...date);
    return client;
  }

  async register(client) {
    const city = await CityService.find({ name: client.city });
    client.city = city.id;
    const existCustomer = await ClientDao.find({ full_name: client.full_name });
    if (existCustomer) {
      throw new Error('Client already exists');
    }
    client.birth_date = formatDate(client.birth_date);
    const register = await ClientDao.register(client);
    return register;
  }

  async update(clientId, value) {
    const [operation] = await ClientDao.update(clientId, value);
    if (operation) {
      const client = await ClientDao.find(clientId);
      return client;
    }
    else {
      throw new UnprocessableEntity('Could not update client');
    }
  }

  async remove(clientId) {
    const operation = await ClientDao.remove(clientId);
    if (!operation) {
      throw new UnprocessableEntity('Could not remove client');
    }
    return;
  }
}

module.exports = new ClientService();
