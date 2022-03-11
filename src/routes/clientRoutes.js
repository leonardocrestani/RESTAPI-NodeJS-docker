const router = require('express').Router();
const ClientController = require('../controllers/ClientController.js');
const registerValidation = require('../validators/Client/register.js');
const updateValidation = require('../validators/Client/update.js');

router.get('/clientes', ClientController.find);
router.post('/clientes', registerValidation, ClientController.register);
router.patch('/clientes/:id', updateValidation, ClientController.update);
router.delete('/clientes/:id', ClientController.remove);

module.exports = router;