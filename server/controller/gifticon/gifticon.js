const jwt = require('jsonwebtoken');
const { giver, helper, gifticon, score, sequelize } = require('../../models');

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
      const { id, user_type: who } = user;

      const statusId = parseInt(req.headers.status);

      let page = Math.abs(parseInt(req.query.page));
      let limit = Math.abs(parseInt(req.query.limit));

      page = !isNaN(page) ? page : 1;
      limit = !isNaN(limit) ? limit : 9;

      const skip = (page - 1) * limit;

      let statusName;

      const getStatusName = (statusId) => {
        if (statusId === 1) {
          statusName = 'used';
        } else if (statusId === 2) {
          statusName = 'accepted';
        } else if (statusId === 3) {
          statusName = 'checking';
        } else if (statusId === 4) {
          statusName = 'rejected';
        } else if (statusId === 5) {
          statusName = 'expired';
        }
        return statusName;
      };

      try {
        let filteredList;
        let point;

        // giver
        if (parseInt(who) === 1) {
          filteredList = await gifticon.findAndCountAll({
            limit,
            offset: skip,
            where:
              statusId !== 0
                ? { giver_id: id, status: getStatusName(statusId) }
                : { giver_id: id },
            include: {
              model: giver,
              required: true,
              attributes: ['id', 'name', 'createdAt'],
            },
          });
          const totalPoint = await score.findAll({
            where: { giver_id: id },
            attributes: [
              [sequelize.fn('sum', sequelize.col('point')), 'points'],
            ],
          });
          point = parseInt(totalPoint[0].dataValues.points);
        }

        // helper
        if (parseInt(who) === 2) {
          filteredList = await gifticon.findAndCountAll({
            limit,
            offset: skip,
            where:
              statusId !== 0
                ? { helper_id: id, status: getStatusName(statusId) }
                : { helper_id: id },
            include: {
              model: helper,
              required: true,
              attributes: ['id', 'name', 'createdAt'],
            },
          });
        }

        let count;
        let gifticonList;

        if (who === 2) {
          point = null;
        }

        if (statusId === 0) {
          count = filteredList.count;
          gifticonList = filteredList.rows;
        } else {
          gifticonList = filteredList.rows;
          count = null;
        }

        const maxPage = Math.ceil(count / limit);
        res.status(200).send({
          gifticonList,
          maxPage,
          count,
          point,
          message: 'successfully get data',
        });
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: 'invalid request' });
      }
    }
  },
};
