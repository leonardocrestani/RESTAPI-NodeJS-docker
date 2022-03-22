const router = require('express').Router();
const ClientController = require('../controllers/ClientController');
const registerValidation = require('../validators/Client/register');
const updateValidation = require('../validators/Client/update');

router.get('/client', ClientController.find);
router.post('/client', registerValidation, ClientController.register);
router.patch('/client/:id', updateValidation, ClientController.update);
router.delete('/client/:id', ClientController.remove);

module.exports = router;
