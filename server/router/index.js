const express = require('express');
const router = express.Router();
const { verification } = require('../controller/verification');
const { gifticon, gifticonDetail } = require('../controller/gifticon');
const { user, helperList, mypage, auth } = require('../controller');
const { dm } = require('../controller/dm');

router.post('/signup/giver', user.signupGiver);
router.post('/signup/helper', user.signupHelper);
router.post('/signin/giver', user.signinGiver);
router.post('/signin/helper', user.signinHelper);
router.post('/signin/guest/giver', user.signinGuestGiver);
router.post('/signin/guest/helper', user.signinGuestHelper);

router.get('/mypage/giver', mypage.mypageGiver.get);
router.get('/mypage/helper', mypage.mypageHelper.get);
router.put('/mypage/giver', mypage.mypageGiver.put);
router.put('/mypage/helper', mypage.mypageHelper.put);
router.post('/mypage/vulnerable', mypage.mypageVulnerable.post);
router.delete('/mypage/vulnerable', mypage.mypageVulnerable.delete);
router.post('/mypage/gifticon', mypage.mypageGifticon.post);
router.delete('/mypage/gifticon', mypage.mypageGifticon.delete);
router.put('/mypage/helper/activity', mypage.mypageHelperActivity.put);
router.put('/mypage/password', mypage.mypagePassword);
router.delete('/mypage/delete', mypage.mypageDelete);

router.get('/verification', verification.get);
router.put('/verification', verification.put);
router.get('/gifticon?', gifticon.get);
router.get('/gifticon/detail/:id', gifticonDetail.getDetail);
router.put('/gifticon/detail/:id', gifticonDetail.updateInfo);
router.post('/gifticon/detail/:id', gifticonDetail.uploadImgMessage);
router.put('/report/:id', gifticonDetail.report);

router.post('/google/signin', user.googleLogin.getToken);
router.get('/google/user?', user.googleLogin.getUser);
router.post('/kakao/signin', user.kakaoLogin.getToken);
router.get('/kakao/user?', user.kakaoLogin.getUser);
router.post('/signout', user.signout.signout);
router.get('/helperlist/:id', helperList.list.getDetail);
router.post('/helperlist/:id', helperList.list.donate);

router.get('/helperlist/category/:id?', helperList.filterList.getFilteredList);

router.get('/dm', dm.get);
router.post('/dm', dm.post);

router.get('/auth', auth.token.get);
router.put('/auth', auth.token.put);

module.exports = router;
