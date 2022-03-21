const ClientDao = require('../dao/ClientDao');
const CityService = require('./CityService');
const NotFound = require('../errors/NotFound');
const UnprocessableEntity = require('../errors/UnprocessableEntity');
const calculateAge = require('../utils/calculateAge');
const formatDate = require('../utils/formatDate');

class ClientService {
  async find(param) {
    let client;
    if (Object.keys(param).length === 1) {
      client = await ClientDao.find(param);
    } else {
      throw new UnprocessableEntity('Invalid parameters pass id or name');
    }
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
    if (!operation) {
      throw new Error('Could not update client');
    }
    return;
  }

  async remove(clientId) {
    const operation = await ClientDao.remove(clientId);
    if (!operation) {
      throw new Error('Could not remove client');
    }
    return;
  }
}

module.exports = new ClientService();
