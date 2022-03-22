const router = require('express').Router();
const CityController = require('../controllers/CityController');
const registerValidation = require('../validators/City/register');

router.get('/city', CityController.find);
router.post('/city', registerValidation, CityController.register);

module.exports = router;
