const express = require('express');
const cityRoutes = require('./cityRoutes.js');
const clientRoutes = require('./clientRoutes.js');

module.exports = (app) => {
    app.use(express.json(), express.urlencoded({ extended:true }));
    app.use(cityRoutes);
    app.use(clientRoutes);
}