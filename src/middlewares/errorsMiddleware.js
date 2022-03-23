const NotFound = require('../errors/NotFound');
const UnprocessableEntity = require('../errors/UnprocessableEntity');

module.exports = (erro, req, res, next) => {
  if (erro instanceof NotFound || erro instanceof UnprocessableEntity) {
      res.status(erro.status).json({ message: erro.message });
    } 
  else {
    res.status(400).json({ message: erro.message });
  }
}