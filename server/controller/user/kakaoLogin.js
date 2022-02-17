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

      // const { nickname: name } = kakaoUser.data.properties;
      const user = kakaoUser.data;

      const giverFound = await giver.findOne({
        where: { email: user.kakao_account.email },
      });

      if (giverFound) {
        const giverInfo = giverFound.dataValues;
        delete giverInfo.password;
        const accessToken = jwt.sign(giverInfo, process.env.ACCESS_SECRET);
        res.send({ accessToken, giverInfo });
      } else {
        const newGiver = await giver.create({
          email: user.kakao_account.email,
          name: user.properties.nickname === '' ? '' : user.properties.nickname,
          user_type: 1,
        });
        const { id, email, name, user_type } = newGiver.dataValues;
        const giverInfo = { id, email, name, user_type };
        const accessToken = jwt.sign(giverInfo, process.env.ACCESS_SECRET);
        res.send({ accessToken, giverInfo });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
