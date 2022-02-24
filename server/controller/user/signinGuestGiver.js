const { giver } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const guestEmailNumber = await giver.count();
    const guestEmail = `guest${guestEmailNumber + 1}@donorticon.com`;
    const giverGuestCreated = await giver.create({
      email: guestEmail,
      name: `guest${guestEmailNumber + 1}`,
      user_type: 1,
    });
    const giverGuestFinder = await giver.findOne({
      where: { email: guestEmail },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    const giverGuestInfo = giverGuestFinder.dataValues;
    if (giverGuestCreated) {
      const accessToken = jwt.sign(giverGuestInfo, process.env.ACCESS_SECRET, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign(
        giverGuestInfo,
        process.env.REFRESH_SECRET,
        {
          expiresIn: '12h',
        },
      );
      res.status(200).json({
        accessToken,
        messeage: 'successfully signed in',
        data: { id: giverGuestInfo.id },
      });
    } else {
      res.status(500).json({ message: 'internal server error' });
    }
  } catch (e) {
    console.log(e);
  }
};
