const { helper } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  try {
    const helperFinder = await helper.findOne({
      where: { email, password },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!helperFinder) {
      res.status(404).json({ message: 'Invalid user' });
    } else {
      const helperInfo = helperFinder.dataValues;
      if (helperInfo.verification) {
        const accessToken = jwt.sign(helperInfo, process.env.ACCESS_SECRET, {
          expiresIn: '1h',
        });
        const refreshToken = jwt.sign(helperInfo, process.env.REFRESH_SECRET, {
          expiresIn: '12h',
        });
        const info = helperInfo;
        res.status(200).json({
          info,
          accessToken,
          messeage: 'successfully signed in',
        });
      } else {
        res.status(401).json({ message: 'verify your email' });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
