const router = require('express').Router();
const ClientController = require('../controllers/ClientController.js');

router.get('/clientes/nome/:nome', ClientController.findByName);
router.get('/clientes/:id', ClientController.findById);
router.post('/clientes', ClientController.register);
router.patch('/clientes/:id', ClientController.update);
router.delete('/clientes/:id', ClientController.remove);

module.exports = router;