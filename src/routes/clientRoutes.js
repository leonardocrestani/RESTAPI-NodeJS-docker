const router = require('express').Router();
const ClientController = require('../controllers/ClientController');
const findValidation = require('../validators/Client/find');
const registerValidation = require('../validators/Client/register');
const updateParamsValidation = require('../validators/Client/updateParams');
const updateBodyValidation = require('../validators/Client/updateBody');
const deleteValidation = require('../validators/Client/delete');

router.get('/client', findValidation, ClientController.find);
router.post('/client', registerValidation, ClientController.register);
router.patch('/client/:id', updateParamsValidation, updateBodyValidation, ClientController.update);
router.delete('/client/:id', deleteValidation, ClientController.remove);

module.exports = router;
