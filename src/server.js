require("dotenv").config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local'
});
const app = require('./app.js');

app.listen(process.env.PORT, () => {
    console.log("API funcionando na porta 3000");
});