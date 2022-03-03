const jwt = require('jsonwebtoken');
const {
  giver,
  helper,
  helper_vulnerable,
  helper_gifticon_category,
  gifticon,
  message,
  room,
} = require('../../models');

module.exports = {
  signout: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token !== 'null') {
      try {
        const tokenDecoded = jwt.decode(token);
        const { id, user_type } = tokenDecoded;
        const user = user_type === 1 ? giver : helper;
        const key = user_type === 1 ? 'giver_id' : 'helper_id';
        const { email } = await user.findOne({
          raw: true,
          where: {
            id,
          },
        });
        if (email.split('@') === 'donorticon.com') {
          user.destry({ where: { id } });
          gifticon.destroy({ where: { [key]: id } });
          message.destroy({ where: { [key]: id } });
          room.destroy({ where: { [key]: id } });
          if (user_type === 2) {
            helper_vulnerable.destroy({ where: { [key]: id } });
            helper_gifticon_category.destroy({ where: { [key]: id } });
          }
        } else {
          user.update({ refresh_token: null }, { where: { id } });
        }
        res.status(205).send({ message: 'successfully logged out' });
      } catch (e) {
        console.log(e.name, 'e. name');
        if (e.name === 'TokenExpiredError') {
          console.log('hi');
          res
            .status(205)
            .send({ message: 'abnormally logged out with token expired' });
        }
        console.log(e);
        res.status(500).send({ message: 'server error' });
      }
    } else {
      res.status(205).send({ message: 'abnormally logged out' });
    }
  },
};
