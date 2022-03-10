const router = require('express').Router();
const CityController = require('../controllers/CityController.js');
const registerValidation = require('../validators/City/register.js')

router.get('/cidades/', CityController.find);
router.post('/cidades/', registerValidation, CityController.register);

module.exports = router;