const express = require('express');
const { companyLogin, registerClient, loginClient } = require('../controllers/authcontroller');



const router = express.Router();

router.post('/login', companyLogin);
router.post('/register-client', registerClient);
router.post('/client-login', loginClient);

module.exports = router;

