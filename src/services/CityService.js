const CityDao = require('../dao/CityDao.js');
const NotFound = require('../errors/NotFound.js');
const UnprocessableEntity = require('../errors/UnprocessableEntity.js');
const states = require('../enums/stateEnum.js');

class CityService {
    async find(param) {
        if(Object.keys(param)[0] === 'nome' && Object.keys(param).length === 1) {
            const cidade = await CityDao.findByName(param.nome);
            if(!cidade) {
                throw new NotFound('Não foi possível encontrar a cidade informada');
            }
            return cidade;
        }
        if(Object.keys(param)[0] === 'estado' && Object.keys(param).length === 1) {
            const existe = states.some((state) => state === param.estado);
            if(!existe) {
                throw new Error ('Estado informado não existe');
            }
            const cidades = await CityDao.findByState(param.estado);
            return cidades;
        }
        else {
            throw new UnprocessableEntity('Parametros invalidos');
        }
    }

    async register(dados) {
        const existe = states.some((state) => state === dados.estado);
        if(!existe) {
            throw new Error('Estado informado nao existe')
        } 
        const cidade = await CityDao.findByName(dados.nome);
        if(cidade) {
            throw new NotFound('Cidade ja cadastrada');
        }
        const result = await CityDao.register(dados);
        return result;
    }
}

module.exports = new CityService();