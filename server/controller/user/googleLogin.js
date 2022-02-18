'use strict';
require('dotenv').config();
const axios = require('axios');
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
      const user = googleUser.data;

      const giverFound = await giver.findOne({ where: { email: user.email } });

      if (giverFound) {
        const giverInfo = giverFound.dataValues;
        delete giverInfo.password;
        const accessToken = jwt.sign(giverInfo, process.env.ACCESS_SECRET);
        res.send({ accessToken, giverInfo });
      } else {
        const newGiver = await giver.create({
          email: user.email,
          name: user.name === '' ? '' : user.name,
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
