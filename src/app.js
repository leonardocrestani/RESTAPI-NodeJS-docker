require("dotenv").config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const express = require('express');
const app = express();
const rotas = require('./routes/routes.js');

rotas(app);

module.exports = app;