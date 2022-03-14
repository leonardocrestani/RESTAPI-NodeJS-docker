require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local',
});
const express = require('express');
const NotFound = require('./errors/NotFound');
const UnprocessableEntity = require('./errors/UnprocessableEntity');

const app = express();
const rotas = require('./routes/routes');

rotas(app);

app.use((erro, req, res, next) => {
  if (erro instanceof NotFound || erro instanceof UnprocessableEntity) {
    res.status(erro.status).json({ message: erro.message });
  } else {
    res.status(400).json({ message: erro.message });
  }
});

module.exports = app;
