const axios = require('axios');
const jwt = require('jsonwebtoken');
const { giver } = require('../../models');

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

        const giverFound = await giver.findOne({
          where: { email: user.email },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'verification', 'verify_hash'],
          },
        });

        if (giverFound) {
          const giverInfo = giverFound.dataValues;
          delete giverInfo.password;
          const accessToken = jwt.sign(giverInfo, process.env.ACCESS_SECRET);
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
            img: 'https://s3.ap-northeast-2.amazonaws.com/donorticon.shop/defaultprofile.jpg'
          });
          const { id, email, name, user_type } = newGiver.dataValues;
          const giverInfo = { id, email, name, user_type };
          const accessToken = jwt.sign(giverInfo, process.env.ACCESS_SECRET);
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
