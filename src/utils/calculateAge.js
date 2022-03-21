const moment = require('moment');

function calculateAge(ano, mes, dia) {
  const age = moment().diff(`${ano}-${mes}-${dia}`, 'years');
  return age;
}

module.exports = calculateAge;
