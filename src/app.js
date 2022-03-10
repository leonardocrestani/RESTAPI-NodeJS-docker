require("dotenv").config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local'
});
const express = require('express');
const NotFound = require('./errors/NotFound.js');
const UnprocessableEntity = require('./errors/UnprocessableEntity.js');
const app = express();
const rotas = require('./routes/routes.js');

rotas(app);

app.use((erro, req, res, next) => {
    if(erro instanceof NotFound || erro instanceof UnprocessableEntity) {
        res.status(erro.status).json({"mensagem": erro.message});
    }
    else {
        res.status(400).json({"mensagem": erro.message});
    }
});

module.exports = app;