const express = require('express');
const { loginClient } = require('../controllers/clientController');


const router = express.Router();

router.post('/client-login', loginClient);

module.exports = router;