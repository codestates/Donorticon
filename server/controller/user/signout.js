const jwt = require('jsonwebtoken');
const { 
  giver, 
  helper, 
  helper_vulnerable, 
  helper_gifticon_category, 
  gifticon, message, 
  room 
} = require('../../models');

module.exports = {
  signout: async (req, res) => {
    try {
      const token = req.cookies.refreshToken;
      const tokenDecoded = jwt.verify(token, process.env.REFRESH_SECRET);
      const { id, user_type } = tokenDecoded;
      if (user_type === 1) { 
        const giverGuestFinder = await giver.findOne({
          where: {
            id
          }
        });
        const giverGuestInfo = giverGuestFinder.dataValues;
        if (
          !giverGuestInfo.password && 
          giverGuestInfo.email.slice(0, 10) === 'guestGiver' && 
          giverGuestInfo.email.split('@')[1] === 'donorticon.com'
          ) {
          await giver.destroy(
            {
              where: { id }
            }
          );
          await gifticon.destroy(
            {
              where: { giver_id: id }
            }
          );
          await message.destroy(
            {
              where: { giver_id: id }
            }
          );
          await room.destroy(
            {
              where: { giver_id: id }
            }
          );
        }
      } else if (user_type === 2) { 
        const helperGuestFinder = await helper.findOne({
          where: {
            id
          }
        });
        const helperGuestInfo = helperGuestFinder.dataValues;
        if (
          !helperGuestInfo.password &&
          helperGuestInfo.email.slice(0, 11) === 'guestHelper' &&
          helperGuestInfo.email.split('@')[1] === 'donorticon.com') {
          await helper.destroy(
            {
              where: { id }
            }
          );
          await helper_vulnerable.destroy(
            {
              where: { helper_id: id }
            }
          );
          await helper_gifticon_category.destroy(
            {
              where: { helper_id: id }
            }
          );
          await message.destroy(
            {
              where: { helper_id: id }
            }
          );
          await room.destroy(
            {
              where: { helper_id: id }
            }
          )
          await gifticon.destroy(
            {
              where: { helper_id: id }
            }
          )
        }
      }
      res.clearCookie('refreshToken');
      res.status(205).send({ message: 'successfully logged out' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'server error' });
    }
  },
};
