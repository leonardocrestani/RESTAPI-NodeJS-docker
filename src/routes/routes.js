const bodyParser = require('body-parser');
const rotasCidades = require('./rotasCidades.js');
const rotasClientes = require('./rotasCliente.js');

module.exports = (app) => {
    app.use(bodyParser.json(), bodyParser.urlencoded({ extended:true }));
    app.use(rotasCidades);
    app.use(rotasClientes);
}