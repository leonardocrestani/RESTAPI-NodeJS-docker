const router = require('express').Router();
const CityController = require('../controllers/CityController.js');
const registerValidation = require('../validators/City/register.js')

router.get('/cidades/', CityController.find);
router.post('/cidades/', registerValidation, CityController.register);
//router.get('/cidades/:nome', CityController.findByName);
//router.get('/cidades/estado/:estado', CityController.findByState);

module.exports = router;