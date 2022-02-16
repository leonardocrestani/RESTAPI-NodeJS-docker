const router = require('express').Router();
const ClienteController = require('../controllers/ClienteController.js');

router.get('/clientes', ClienteController.listaTodos);
router.get('/clientes/:id', ClienteController.listaPeloId);
router.post('/clientes', ClienteController.cadastra);
router.patch('/clientes/:id', ClienteController.atualiza);
router.delete('/clientes/:id', ClienteController.remove);

module.exports = router;