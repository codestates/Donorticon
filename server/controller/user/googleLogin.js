const axios = require('axios');
const jwt = require('jsonwebtoken');
const { giver } = require('../../models');
const { cookieOption } = require('../auth/token');

module.exports = {
  getToken: async (req, res) => {
    const code = req.body.code;
    const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`;
    try {
      const data = await axios.post(url, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
      const { access_token: token } = data.data;
      res.status(200).send({ token, message: 'token generated successfully' });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: 'bad request' });
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

      if (token && googleUser) {
        const user = googleUser.data;

        const giverInfo = await giver.findOne({
          raw: true,
          where: { email: user.email },
          attributes: ['id', 'user_type', 'email', 'name'],
        });

        if (giverInfo) {
          const { id, user_type } = giverInfo;
          const accessToken = jwt.sign(
            { id, user_type },
            process.env.ACCESS_SECRET,
            {
              expiresIn: '1h',
            },
          );
          const refreshToken = jwt.sign(
            { id, user_type },
            process.env.REFRESH_SECRET,
            {
              expiresIn: '12h',
            },
          );
          res.cookie('refreshToken', refreshToken, cookieOption);
          res.status(200).send({
            accessToken,
            giverInfo,
            message: 'successfully get user information',
          });
        } else {
          const newGiver = await giver.create({
            email: user.email,
            name: user.name === '' ? '' : user.name,
            user_type: 1,
            img: 'https://s3.ap-northeast-2.amazonaws.com/donorticon.shop/defaultprofile.jpg',
            social: true,
          });
          const { id, user_type, name, email } = newGiver.dataValues;
          const giverInfo = { id, user_type, name, email };
          const accessToken = jwt.sign(
            { id, user_type },
            process.env.ACCESS_SECRET,
            {
              expiresIn: '1h',
            },
          );
          const refreshToken = jwt.sign(
            { id, user_type },
            process.env.REFRESH_SECRET,
            {
              expiresIn: '12h',
            },
          );
          res.cookie('refreshToken', refreshToken, cookieOption);
          res.status(200).send({
            accessToken,
            giverInfo,
            message: 'successfully get user information',
          });
        }
      } else {
        res.status(404).send({ data: null, message: 'user not found' });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
