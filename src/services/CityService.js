const CityDao = require('../dao/CityDao');
const NotFound = require('../errors/NotFound');

class CityService {
  async find(param) {
    if (param.state) {
      return await CityDao.findByState(param);
    } 
    else {
      const city = await CityDao.find(param);
      if (!city) {
        throw new NotFound('Informed city not found');
      }
      return city;
    }
  }

  async register(dados) {
    const city = await CityDao.find({ name: dados.name });
    if (city) {
      throw new NotFound('City already registered');
    }
    const result = await CityDao.register(dados);
    return result;
  }
}

module.exports = new CityService();
