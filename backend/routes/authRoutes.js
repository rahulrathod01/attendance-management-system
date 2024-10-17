const express = require('express');
const { companyLogin, registerClient } = require('../controllers/authcontroller');


const router = express.Router();

router.post('/login', companyLogin);
router.post('/register-client', registerClient);

module.exports = router;