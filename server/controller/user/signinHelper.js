const { helper } = require('../../models');
const jwt = require('jsonwebtoken');
const { cookieOption } = require('../auth/token');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  try {
    const helperFinder = await helper.findOne({
      where: { email, password },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!helperFinder) {
      res.status(404).json({ message: 'invalid user' });
    } else {
      const helperInfo = helperFinder.dataValues;
      const helperInfoForToken = {
        id: helperInfo.id,
        user_type: helperInfo.user_type,
      };
      if (helperInfo.verification) {
        const accessToken = jwt.sign(
          helperInfoForToken,
          process.env.ACCESS_SECRET,
          {
            expiresIn: '1h',
          },
        );
        const refreshToken = jwt.sign(
          helperInfoForToken,
          process.env.REFRESH_SECRET,
          {
            expiresIn: '12h',
          },
        );
        const info = helperInfo;
        res.cookie('refreshToken', refreshToken, cookieOption);
        res.status(200).json({
          info,
          accessToken,
          messeage: 'successfully signed in',
        });
      } else {
        const { id, email, user_type: type } = helperInfo;
        res.status(401).json({ message: 'verify your email', id, email, type });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
