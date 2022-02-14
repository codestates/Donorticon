const express = require('express');
const router = express.Router();
const { verification } = require('../controller');

router.get('/verification', verification.get);
router.put('/verification', verification.put);

module.exports = router;
