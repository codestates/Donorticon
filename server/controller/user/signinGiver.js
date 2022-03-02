const { giver } = require('../../models');
const jwt = require('jsonwebtoken');
const { cookieOption } = require('../auth/token');

module.exports = async (req, res) => {
  console.log(cookieOption);
  const { email, password } = req.body;
  try {
    const giverFinder = await giver.findOne({
      where: { email, password },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!giverFinder) {
      res.status(404).json({ message: 'invalid user' });
    } else {
      const giverInfo = giverFinder.dataValues;
      const giverInfoForToken = { id: giverInfo.id, user_type: giverInfo.user_type };
      if (giverInfo.verification) {
        const accessToken = jwt.sign(giverInfoForToken, process.env.ACCESS_SECRET, {
          expiresIn: '1h',
        });
        const refreshToken = jwt.sign(giverInfoForToken, process.env.REFRESH_SECRET, {
          expiresIn: '12h',
        });
        const info = giverInfo;
        res.cookie('refreshToken', refreshToken, cookieOption);
        res
          .status(200)
          .json({ info, accessToken, messeage: 'successfully signed in' });
      } else {
        const { id, email } = giverInfo;
        res
          .status(401)
          .json({ message: 'verify your email', id, email, type: 1 });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
