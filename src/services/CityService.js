const CityDao = require('../dao/CityDao');
const NotFound = require('../errors/NotFound');
const UnprocessableEntity = require('../errors/UnprocessableEntity');
const states = require('../enums/stateEnum');

class CityService {
  async find(param) {
    if (Object.keys(param).length === 1) {
      if (param.state) {
        const existState = states.some((state) => state === param.state);
        if (!existState) {
          throw new NotFound('Informed state does not exist');
        }
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
    else {
      throw new UnprocessableEntity('Invalid parameters');
    }
  }

  async register(dados) {
    const validState = states.some((state) => state === dados.state);
    if (!validState) {
      throw new NotFound('Informed state not found');
    }
    const city = await CityDao.find({ name: dados.name });
    if (city) {
      throw new NotFound('City already registered');
    }
    const result = await CityDao.register(dados);
    return result;
  }
}

module.exports = new CityService();
