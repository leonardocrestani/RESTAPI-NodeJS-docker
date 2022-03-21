require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.local',
});
const app = require('./app');

app.listen(process.env.PORT, () => {console.log('API listening on port 3000')});
