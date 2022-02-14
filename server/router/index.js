const express = require('express');
const router = express.Router();
const { verification } = require('../controller/verification');

router.get('/verification', verification.get);
router.put('/verification', verification.put);

module.exports = router;
