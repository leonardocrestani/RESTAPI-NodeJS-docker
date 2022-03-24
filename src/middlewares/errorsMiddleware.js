const NotFound = require('../errors/NotFound');
const UnprocessableEntity = require('../errors/UnprocessableEntity');

module.exports = (erro, req, res, next) => {
  if (erro instanceof NotFound || erro instanceof UnprocessableEntity) {
    return res.status(erro.status).json({ message: erro.message });
    } 
  else {
    return res.status(500).json({ message: erro.message });
  }
}