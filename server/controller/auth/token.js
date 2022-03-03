const jwt = require('jsonwebtoken');
const { giver, helper } = require('../../models');

module.exports = {
  get: (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const { exp } = jwt.verify(token, process.env.ACCESS_SECRET);
      const rest = exp - Date.now() / 1000;
      res.status(200).json({ message: 'ok', rest });
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        res.status(401).json('access expired');
      }
    }
  },
  put: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const tokenDecoder = jwt.decode(token);
      const { id, user_type } = tokenDecoder;
      const user = user_type === 1 ? giver : helper;
      const tokenInfo = await user.findOne({
        raw: true,
        where: { id },
        attributes: ['refresh_token'],
      });
      const { refresh_token: refreshToken } = tokenInfo;
      jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      const accessToken = jwt.sign(
        { id, user_type },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1h',
        },
      );
      res.status(200).json({ message: 'ok', accessToken });
    } catch (e) {
      console.log(e);
      if (e.name === 'JsonWebTokenError') {
        res.status(401).json('refresh expired');
      }
    }
  },
  cookieOption: {
    sameSite: 'None',
    secure: true,
    httpOnly: true,
  },
};
