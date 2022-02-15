'use strict';
require('dotenv').config();
const axios = require('axios');
const { create } = require('domain');
const { giver } = require('../../models');
const jwt = require('jsonwebtoken');
const { access } = require('fs');

module.exports = {
  getToken: async (req, res) => {
    const code = req.body.code;
    const url = `https://kauth.kakao.com/oauth/token?grant_type=${process.env.KAKAO_GRANT_TYPE}&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}&scope=account_email`;
    try {
      const token = await axios.post(url, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
      const data = token.data;
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  },
  getUser: async (req, res) => {
    const token = req.query.accessToken;
    const kakaoAPI = 'https://kapi.kakao.com/v2/user/me';
    try {
      const kakaoUser = await axios.get(kakaoAPI, {
        body: {
          property_keys: ['kakao_account.email'],
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      });
      const { nickname: name } = kakaoUser.data.properties;
      const { email } = kakaoUser.data.kakao_account;

      const [newGiver, created] = await giver.findOrCreate({
        where: {
          email,
          name: name ? name : '',
          user_type: 'giver_kakao',
        },
      });
      const userInfo = newGiver.dataValues;
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET);
      res.send({ accessToken, userInfo });
    } catch (e) {
      console.log(e);
    }
  },
};
