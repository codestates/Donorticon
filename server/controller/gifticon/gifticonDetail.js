const jwt = require('jsonwebtoken');
const { gifticon, helper, giver, message, gallery, sequelize } = require('../../models');
const generateUploadURL = require('../s3');
const { QueryTypes } = require('sequelize');

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
  report: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'invalid token' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_SECRET);

    if (token && user) {
      const gifticonId = parseInt(req.params.id);
      const giverId = parseInt(req.body.giverId);

      //TODO: gifticon img => 신고당햇다는 뭐 그런 이미지로 바꾸는거 필요
      //TODO: BLACK POINT -1점은 너무 낮지 않나?
      await gifticon.update(
        { report: true, point: -1, status: 'reported' },
        { where: { id: gifticonId } },
      );

      const data = await gifticon.findOne({
        where: { id: gifticonId },
        attributes: ['id', , 'status'],
      });
      const { status, report } = data.dataValues;
      res.status(200).send({ status, report, message: 'successfully updated' });
    }
  },
  uploadImgMessage : async (req, res) => {
    const url = await generateUploadURL();
    const messageFromGiver = req.body.message;
    try {
      const imageUrl = url.split('?')[0];

      const saveImage = await gallery.create({
        helper_id: req.body.helperId,
        img: imageUrl,
      });

      const roomId = await sequelize.query(`SELECT * FROM rooms WHERE giver_id=${req.body.giverId} AND helper_id=${req.body.helperId}`, { type: QueryTypes.SELECT });

      if (messageFromGiver) {
        await message.create({
          room_id: roomId.id,
          giver_id: req.body.giverId,
          helper_id: req.body.helperId,
          gifticon_id: req.body.gifticonId,
          type: 2,
          message: messageFromGiver
        });
      }
      res.status(200).json({ url: url });
    } catch (e) {
      res.status(500).json({ message: 'intenal server error' });
    }
  }
};
