const express = require('express');
const router = express.Router();
const { verification } = require('../controller/verification');
const { gifticon } = require('../controller/gifticon')
const { user } = require('../controller');

router.post('/signup/giver', user.signup_giver);
router.get('/verification', verification.get);
router.put('/verification', verification.put);
router.get('/gifticon', gifticon.get);

module.exports = router;
