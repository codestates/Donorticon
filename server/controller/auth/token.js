const jwt = require('jsonwebtoken');
const { giver, helper } = require('../../models');

module.exports = {
  get: (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      jwt.verify(token, process.env.ACCESS_SECRET);
      res.status(200).json({ message: 'ok' });
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        res.status(401).json('access expired');
      }
    }
  },
  put: async (req, res) => {
    const token = req.cookies.refreshToken;
    try {
      const tokenDecoder = jwt.verify(token, process.env.REFRESH_SECRET);
      const { id, user_type } = tokenDecoder;
      const user = user_type === 1 ? giver : helper;
      const userInfo = await user.findOne({
        raw: true,
        where: { id },
        attributes: ['id', 'user_type'],
      });
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, {
        expiresIn: '10s',
      });
      res.status(200).json({ message: 'ok', accessToken });
    } catch (e) {
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
