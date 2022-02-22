const jwt = require('jsonwebtoken');
const { gifticon, helper, giver, score } = require('../../models');

module.exports = {
  getDetail: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'invalid token' });
    }
    const token = req.headers.authorization.split(' ')[1];

    const user = jwt.verify(token, process.env.ACCESS_SECRET);

    if (token && user) {
      const id = parseInt(req.params.id);
      const { user_type: who } = user;

      let gifticonInfo;

      // giver
      if (parseInt(who) === 1) {
        try {
          gifticonInfo = await gifticon.findOne({
            where: { id },
            include: {
              model: helper,
              required: true,
              attributes: ['id', 'name'],
            },
          });
        } catch (e) {
          console.log(e);
        }
      }

      // helper
      if (parseInt(who) === 2) {
        try {
          gifticonInfo = await gifticon.findOne({
            where: { id },
            include: {
              model: giver,
              required: true,
              attributes: ['id', 'name'],
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
      res.status(200).send({ gifticonInfo });
    } else {
      return res.status(404).send({ message: 'invalid request' });
    }
  },
  updateInfo: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'invalid token' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_SECRET);
    const { id: helperId, user_type: who } = user;

    const gifticonId = parseInt(req.params.id);

    // helper만 가능
    if (token && who === 2) {
      // 기프티콘 상태 변경
      if (req.body.status) {
        const status = req.body.status;
        let statusName;

        if (status === '사용함') {
          statusName = 'used';
        } else if (status === '수락함') {
          statusName = 'accepted';
        } else if (status === '확인중') {
          statusName = 'checking';
        } else if (status === '거절됨') {
          statusName = 'rejected';
        } else if (status === '만료됨') {
          statusName = 'expired';
        }

        try {
          await gifticon.update(
            { status: statusName },
            { where: { id: gifticonId } },
          );
          const data = await gifticon.findOne({
            where: { id: gifticonId },
            attributes: {
              exclude: ['giver_id', 'helper_id', 'createdAt', 'updatedAt'],
            },
          });
          const updated = data.dataValues;
          res.status(200).send({ updated, mesasge: 'successfully changed' });
        } catch (e) {
          console.log(e);
        }
      }

      // 연탄 포인트 변경
      if (req.body.point) {
        const point = parseInt(req.body.point);
        const giverId = parseInt(req.body.giverId);

        console.log('giverId', giverId);
        console.log('helperId', helperId);

        try {
          const [data, created] = await score.findOrCreate({
            where: { helper_id: helperId, giver_id: giverId },
            defaults: { point },
          });

          if (created) {
            return res.status(200).send({ mesasge: 'successfully changed' });
          } else {
            await score.update(
              { point },
              { where: { helper_id: helperId, giver_id: giverId } },
            );
            return res.status(200).send({ mesasge: 'successfully changed' });
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
};
