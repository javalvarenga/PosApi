const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Define rutas aquí
router.post(`/updateAccount/:id`, accountController.updateAccount);
router.get('/getAccountReport', accountController.getAccountReport);
router.post('/updateAccountSaldo', accountController.updateAccountSaldo);



module.exports = router;