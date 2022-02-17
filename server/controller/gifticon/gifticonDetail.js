const jwt = require('jsonwebtoken');
const { gifticon, helper } = require('../../models');

module.exports = {
  getDetail: async (req, res) => {
    const token = req.headers.authorization;
    const { id } = req.params;

    const user = jwt.verify(token, process.env.ACCESS_SECRET);
    //TODO: token이 없는 경우 추가해야함
    if (token && user) {
      const { user_type } = user;
      let gifticonInfo;

      if (Number(user_type) === 1) {
        try {
          gifticonInfo = await gifticon.findOne({
            where: { id },
            include: {
              model: helper,
              required: true,
              attributes: ['name'],
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
      res.status(200).send({ gifticonInfo });
    }
  },
};
