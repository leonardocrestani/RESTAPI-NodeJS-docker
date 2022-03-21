const moment = require('moment');

function formatDate(data) {
  const date = moment(data, 'DD/MM/YYYY');
  return date.format('YYYY-MM-DD');
}

module.exports = formatDate;
