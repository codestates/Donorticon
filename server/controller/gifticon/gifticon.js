require('dotenv').config();
const jwt = require('jsonwebtoken');
const { giver, helper, gifticon } = require('../../models');

module.exports = {
  get: async (req, res) => {
    // console.log(req.headers.authorization);
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

      let gifticonList;

      // 1. 로그인한 유저가 giver 일때
      if (Number(user_type) === 1) {
        try {
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
            attributes: Number(user_type === 1)
              ? {
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
                }
              : {
                  exclude: [
                    'password',
                    'mobile',
                    'user_type',
                    'verification',
                    'verify_hash',
                  ],
                },
          },
        });
        // console.log(result.rows[0]);
        const { count, rows: list } = result;
        const maxPage = Math.ceil(count / limit);
        res.status(200).send({ list, maxPage, count });
      } catch (e) {
        console.log(e);
      }
    }
  },
};
