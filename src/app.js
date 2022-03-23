require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local',
});
const express = require('express');

const app = express();
const routes = require('./routes/routes');
const errorsMiddleware = require('./middlewares/errorsMiddleware');
const accessControlMiddleware = require('./middlewares/accessControlMiddleware');


app.use(accessControlMiddleware);
routes(app);
app.use(errorsMiddleware);

module.exports = app;