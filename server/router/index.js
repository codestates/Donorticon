const express = require('express');
const router = express.Router();
const { verification } = require('../controller/verification');
const { gifticon, gifticonDetail } = require('../controller/gifticon');
const { user, helperlist } = require('../controller');

router.post('/signup/giver', user.signup_giver);
router.post('/signup/helper', user.signup_helper);
router.post('/signin/giver', user.signin_giver);
router.post('/signin/helper', user.signin_helper);
router.post('/signin/giver/guest', user.signin_giver_guest);
router.post('/signin/helper/guest', user.signin_helper_guest);

router.get('/verification', verification.get);
router.put('/verification', verification.put);
router.get('/gifticon?', gifticon.get);
router.get('/gifticon/detail/:id', gifticonDetail.getDetail);
router.put('/gifticon/detail/:id', gifticonDetail.changeStatus);
router.post('/google/signin', user.googleLogin.getToken);
router.get('/google/user?', user.googleLogin.getUser);
router.post('/kakao/signin', user.kakaoLogin.getToken);
router.get('/kakao/user?', user.kakaoLogin.getUser);
router.post('/signout', user.signout.signout);
router.get('/helperlist?', helperlist.helperlist.getList);

module.exports = router;
