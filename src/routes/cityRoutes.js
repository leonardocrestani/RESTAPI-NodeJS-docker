const router = require('express').Router();
const CityController = require('../controllers/CityController');
const findValidation = require('../validators/City/find');
const registerValidation = require('../validators/City/register');

router.get('/city', findValidation, CityController.find);
router.post('/city', registerValidation, CityController.register);

module.exports = router;
