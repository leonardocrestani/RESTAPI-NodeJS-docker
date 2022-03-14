const moment = require('moment');

function formatDate(data) {
  const dataFormatada = moment(data, 'DD/MM/YYYY');
  return dataFormatada.format('YYYY-MM-DD');
}

module.exports = formatDate;
