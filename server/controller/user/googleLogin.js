'use strict';
require('dotenv').config();
const axios = require('axios');
const { create } = require('domain');
const { giver } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  getToken: async (req, res) => {
    const code = req.body.code;
    const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`;
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
    const googleAPI = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`;
    try {
      const googleUser = await axios.get(googleAPI, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = googleUser.data;

      const { email, name } = data;

      const [newGiver, created] = await giver.findOrCreate({
        where: {
          email,
          name,
          user_type: 'giver',
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
