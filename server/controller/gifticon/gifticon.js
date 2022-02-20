const jwt = require('jsonwebtoken');
const { giver, helper, gifticon } = require('../../models');

module.exports = {
  get: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'invalid token' });
    }

    const token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
      return res.status(401).send({ message: 'invalid token' });
    }

    const user = jwt.verify(token, process.env.ACCESS_SECRET);

    if (!user) {
      return res.status(401).send('invalid token');
    }

    if (token && user) {
      const { id, user_type, name } = user;

      let page = Math.abs(parseInt(req.query.page));
      let limit = Math.abs(parseInt(req.query.limit));

      page = !isNaN(page) ? page : 1;
      limit = !isNaN(limit) ? limit : 9;

      const skip = (page - 1) * limit;

      let gifticonList;

      if (Number(user_type) === 1) {
        try {
          gifticonList = await gifticon.findAll({
            where: { giver_id: id },
          });
        } catch (e) {
          console.log(e);
        }
      }

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
          where: Number(user_type) === 1 ? { giver_id: id } : { helper_id: id },
          limit,
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

        const { count, rows: gifticonList } = result;
        const maxPage = Math.ceil(count / limit);
        res.status(200).send({
          gifticonList,
          maxPage,
          count,
          message: 'successfully get data',
        });
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: 'invalid request' });
      }
    }
  },
};
