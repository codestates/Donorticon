const express = require('express');
const router = express.Router();
const { verification } = require('../controller/verification');
const { gifticon } = require('../controller/gifticon');
const { user } = require('../controller');

router.post('/signup/giver', user.signup_giver);
router.get('/verification', verification.get);
router.put('/verification', verification.put);
router.get('/gifticon', gifticon.get);
router.post('/google/signin', user.googleLogin.getToken);
router.get('/google/user?', user.googleLogin.getUser);
router.post('/kakao/signin', user.kakaoLogin.getToken);
router.get('/kakao/user?', user.kakaoLogin.getUser);
router.post('/signout', user.signout.signout);

module.exports = router;
