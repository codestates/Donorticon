const jwt = require('jsonwebtoken');
const { gifticon, helper, giver, message, sequelize } = require('../../models');
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

      const thanksImg = await message.findAll({
        raw: true,
        where: { gifticon_id: id, thanksImg: true },
        attributes: ['img'],
        order: [['id', 'DESC']],
      });

      let thanksImgUrl;

      if (thanksImg.length !== 0) {
        thanksImgUrl = thanksImg[0].img;
      } else {
        thanksImgUrl = null;
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

    if (token && who === 2) {
      if (req.body.status) {
        const status = req.body.status;
        try {
          await gifticon.update({ status }, { where: { id: gifticonId } });
          const updated = await gifticon.findOne({
            raw: true,
            where: { id: gifticonId },
            attributes: ['status'],
          });
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
            raw: true,
            where: { id: gifticonId, helper_id: helperId, giver_id: giverId },
            attributes: ['point'],
          });
          const updatedPoint = gifticonInfo.point;
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

      await gifticon.update(
        { report: true, point: -1, status: 'reported' },
        { where: { id: gifticonId } },
      );

      const data = await gifticon.findOne({
        raw: true,
        where: { id: gifticonId },
        attributes: ['id', 'status', 'report'],
      });

      const { status, report } = data;
      res.status(200).send({ status, report, message: 'successfully updated' });
    }
  },
  uploadImgMessage: async (req, res) => {
    const gifticonId = parseInt(req.params.id);
    const { message: messageFromHelper, giverId, helperId } = req.body;
    const roomId = await sequelize.query(
      `SELECT * FROM rooms WHERE giver_id=${giverId} AND helper_id=${helperId}`,
      { type: QueryTypes.SELECT },
    );

    if (messageFromHelper) {
      try {
        await message.create({
          room_id: roomId[0].id,
          giver_id: giverId,
          helper_id: helperId,
          gifticon_id: gifticonId,
          type: 2,
          message: messageFromHelper,
        });

        res.status(200).json({ message: 'Ok' });
      } catch (e) {
        res.status(500).json({ message: 'intenal server error' });
      }
    } else {
      try {
        const url = await generateUploadURL();
        const imageUrl = url.split('?')[0];

        await message.create({
          room_id: roomId[0].id,
          giver_id: req.body.giverId,
          helper_id: req.body.helperId,
          gifticon_id: req.body.gifticonId,
          img: imageUrl,
          type: 2,
          thanksImg: true,
        });

        res.status(200).json({ url, imageUrl });
      } catch (e) {
        res.status(500).json({ message: 'intenal server error' });
      }
    }
  },
};
