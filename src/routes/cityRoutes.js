const router = require('express').Router();
const CityController = require('../controllers/CityController');
const registerValidation = require('../validators/City/register');

router.get('/cidades', CityController.find);
router.post('/cidades/', registerValidation, CityController.register);

module.exports = router;
