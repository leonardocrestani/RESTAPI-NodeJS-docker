const bodyParser = require('body-parser');
const rotasCidade = require('./rotasCidade.js');
const rotasCliente = require('./rotasCliente.js');

module.exports = (app) => {
    app.use(bodyParser.json(), bodyParser.urlencoded({ extended:true }));
    app.use(rotasCidade);
    app.use(rotasCliente);
}