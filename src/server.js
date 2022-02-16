require('dotenv').config();
const express = require('express');
const app = express();
const rotas = require('./routes/routes.js');

rotas(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('rota 3000 funcionando');
});