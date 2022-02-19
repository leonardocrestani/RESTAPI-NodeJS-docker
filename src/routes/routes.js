const bodyParser = require('body-parser');
const cityRoutes = require('./cityRoutes.js');
const clientRoutes = require('./clientRoutes.js');

module.exports = (app) => {
    app.use(bodyParser.json(), bodyParser.urlencoded({ extended:true }));
    app.use(cityRoutes);
    app.use(clientRoutes);
}