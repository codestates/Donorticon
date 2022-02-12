const express = require('express');
const router = express.Router();
const { verification } = require('../controller');

router.get( '/verification', verification.get);

module.exports = router;