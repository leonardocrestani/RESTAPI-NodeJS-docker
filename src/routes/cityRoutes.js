const router = require('express').Router();
const CityController = require('../controllers/CityController.js');

router.post('/cidades', CityController.register);
router.get('/cidades/:nome', CityController.findByName);
router.get('/cidades/estado/:estado', CityController.findByState);

module.exports = router;