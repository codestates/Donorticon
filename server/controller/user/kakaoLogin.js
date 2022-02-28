const axios = require('axios');
const jwt = require('jsonwebtoken');
const { giver } = require('../../models');

module.exports = {
  getToken: async (req, res) => {
    const code = req.body.code;
    const url = `https://kauth.kakao.com/oauth/token?grant_type=${process.env.KAKAO_GRANT_TYPE}&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}&scope=account_email`;
    try {
      const { data } = await axios.post(url, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
      //TODO: 나중에 리프레쉬 토큰 설정할때를 위해서 일단 정보 가져오기
      const { access_token: token, refresh_token } = data;
      res.status(200).send({ token, message: 'token generated successfully' });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: 'bad request' });
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

      if (token && kakaoUser) {
        const user = kakaoUser.data;
        // const { nickname: name } = kakaoUser.data.properties;

        const giverFound = await giver.findOne({
          where: { email: user.kakao_account.email },
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
            email: user.kakao_account.email,
            name:
              user.properties.nickname === '' ? '' : user.properties.nickname,
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
