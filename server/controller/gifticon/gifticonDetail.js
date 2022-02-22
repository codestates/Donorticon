const jwt = require('jsonwebtoken');
const { gifticon, helper, giver, message } = require('../../models');

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

      const thanksImg = await message.findOne({
        where: { gifticon_id: id },
        attributes: ['img'],
      });
      let thanksImgUrl = null;
      if (thanksImg) {
        thanksImgUrl = thanksImg.dataValues.img;
      }
      res.status(200).send({ gifticonInfo, thanksImgUrl });
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

    // helper만 가능한 기능들
    if (token && who === 2) {
      // 기프티콘 상태 변경
      if (req.body.status) {
        const status = req.body.status;
        try {
          await gifticon.update({ status }, { where: { id: gifticonId } });
          const data = await gifticon.findOne({
            where: { id: gifticonId },
            attributes: ['status'],
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

        try {
          await gifticon.update(
            { point },
            {
              where: {
                id: gifticonId,
                helper_id: helperId,
                giver_id: giverId,
              },
            },
          );
          const gifticonInfo = await gifticon.findOne({
            where: { id: gifticonId, helper_id: helperId, giver_id: giverId },
            attributes: ['point'],
          });
          const updatedPoint = gifticonInfo.dataValues.point;
          res
            .status(200)
            .send({ updatedPoint, mesasge: 'successfully changed' });
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
};
