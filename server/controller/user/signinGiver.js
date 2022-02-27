const { giver } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
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
      if (giverInfo.verification) {
        const accessToken = jwt.sign(giverInfo, process.env.ACCESS_SECRET, {
          expiresIn: '1h',
        });
        const refreshToken = jwt.sign(giverInfo, process.env.REFRESH_SECRET, {
          expiresIn: '12h',
        });
        const info = giverInfo;
        res
          .status(200)
          .json({ info, accessToken, messeage: 'successfully signed in' });
      } else {
        res.status(401).json({ message: 'verify your email' });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
