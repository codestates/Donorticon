const express = require('express');
const { gifticon } = require('../controller/gifticon');
const router = express.Router();
const { verification } = require('../controller/verification');

router.get('/verification', verification.get);
router.put('/verification', verification.put);
router.get('/gifticon', gifticon.get);

module.exports = router;
