const { giver } = require('../../models');
const jwt = require('jsonwebtoken');
const { cookieOption } = require('../auth/token');

module.exports = async (req, res) => {
  try {
    const giverEmailNumber = await giver.count();
    const giverEmail = `guestGiver${giverEmailNumber + 1}@donorticon.com`;
    const giverGuestCreated = await giver.create({
      email: giverEmail,
      name: `guestGiver${giverEmailNumber + 1}`,
      user_type: 1,
      img: 'https://s3.ap-northeast-2.amazonaws.com/donorticon.shop/defaultprofile.jpg',
    });
    const giverGuestFinder = await giver.findOne({
      where: { email: giverEmail },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    const giverGuestInfo = giverGuestFinder.dataValues;
    if (giverGuestCreated) {
      const giverGuestInfoForToken = {
        id: giverGuestInfo.id,
        user_type: giverGuestInfo.user_type
      }
      const accessToken = jwt.sign(
        giverGuestInfoForToken, process.env.ACCESS_SECRET, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign(Object.assign(
        giverGuestInfoForToken
        ),
        process.env.REFRESH_SECRET,
        {
          expiresIn: '12h',
        },
      );
      res.cookie('refreshToken', refreshToken, cookieOption);
      res.status(200).json({
        accessToken,
        messeage: 'successfully signed in',
        data: {
          id: giverGuestInfo.id,
          email: giverGuestInfo.email,
          name: giverGuestInfo.name,
        },
      });
    } else {
      res.status(500).json({ message: 'internal server error' });
    }
  } catch (e) {
    console.log(e);
  }
};
