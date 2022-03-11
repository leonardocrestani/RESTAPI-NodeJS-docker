const moment = require('moment');

function formatDate(data) {
    let dataFormatada = moment(data, 'DD/MM/YYYY');
    return dataFormatada.format('YYYY-MM-DD'); 
}

module.exports = formatDate;