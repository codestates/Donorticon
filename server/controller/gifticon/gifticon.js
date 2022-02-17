require('dotenv').config();
const jwt = require('jsonwebtoken');
const { giver, helper, gifticon } = require('../../models');

module.exports = {
  get: async (req, res) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (token) {
      // 로그인한 유저 정보 가져오기
      const user = jwt.verify(token, process.env.ACCESS_SECRET);
      const { id, user_type, name } = user;

      let page = Math.max(parseInt(req.query.page));
      let limit = Math.max(parseInt(req.query.limit));

      page = !isNaN(page) ? page : 1;
      limit = !isNaN(limit) ? limit : 9;

      const skip = (page - 1) * limit;

      // 1. 로그인한 유저가 giver 일때
      let gifticonList;

      if (Number(user_type) === 1) {
        // 어떤 helper에게 기부했는지 그 helper 이름이 필요함
        try {
          console.log('기버임다');
          gifticonList = await gifticon.findAll({
            where: { giver_id: id },
          });
        } catch (e) {
          console.log(e);
        }
      }

      // 2. 로그인한 유저가 helper 일때
      if (Number(user_type) === 2) {
        try {
          console.log('헬퍼여유');
          gifticonList = await gifticon.findAll({
            where: { helper_id: id },
          });
        } catch (e) {
          console.log(e);
        }
      }

      try {
        const result = await gifticon.findAndCountAll({
          limit: 9,
          offset: skip,
          include: {
            model: Number(user_type) === 1 ? helper : giver,
            required: true,
            attributes: {
              exclude: [
                'password',
                'slogan',
                'description',
                'location',
                'createdAt',
                'updatedAt',
                'mobile',
                'user_type',
                'verification',
                'verify_hash',
              ],
            },
          },
        });
        const { count, rows: list } = result;
        const maxPage = Math.ceil(count / limit);
        res.status(200).send({ list, maxPage, count });
      } catch (e) {
        console.log(e);
      }
    }
  },
};
