const router = require('express').Router();
const CidadeController = require('../controllers/CidadeController.js');

router.post('/cidades', CidadeController.cadastra);
router.get('/cidades/:nome', CidadeController.buscaPeloNome);
router.get('/cidades/estado/:estado', CidadeController.buscaPeloEstado);

module.exports = router;