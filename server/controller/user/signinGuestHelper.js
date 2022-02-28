const { helper } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const helperEmailNumber = await helper.count();
    const helperEmail = `guestHelper${helperEmailNumber + 1}@donorticon.com`;
    const helperGuestCreated = await helper.create({
      email: helperEmail,
      name: `guestHelper${helperEmailNumber + 1}`,
      user_type: 2,
      img: 'https://s3.ap-northeast-2.amazonaws.com/donorticon.shop/defaultprofile.jpg'
    });
    const helperGuestFinder = await helper.findOne({
      where: { email: helperEmail },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    const helperGuestInfo = helperGuestFinder.dataValues;
    console.log(helperGuestInfo);
    if (helperGuestCreated) {
      const accessToken = jwt.sign(helperGuestInfo, process.env.ACCESS_SECRET, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign(
        helperGuestInfo,
        process.env.REFRESH_SECRET,
        {
          expiresIn: '12h',
        },
      );
      res.status(200).json({
        accessToken,
        messeage: 'successfully signed in',
        data: { id: helperGuestInfo.id, email: helperGuestInfo.email, name: helperGuestInfo.name },
      });
    } else {
      res.status(500).json({ message: 'internal server error' });
    }
  } catch (e) {
    console.log(e);
  }
};
