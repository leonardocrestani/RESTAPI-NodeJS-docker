const moment = require('moment');

function calculateAge(ano, mes, dia) {
  const idade = moment().diff(`${ano}-${mes}-${dia}`, 'years');
  return idade;
}

module.exports = calculateAge;
