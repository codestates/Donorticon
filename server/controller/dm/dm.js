const jwt = require('jsonwebtoken');
const { room, helper, giver, message } = require('../../models');
const generateUploadURL = require('../s3')

module.exports = {
  get: async (req, res) => {
    if (Object.keys(req.query).length !== 0) {
      const room = req.query.room;
      let dialogues = await message.findAll({
        order: [['id', 'DESC']],
        where:{room_id:room}
      });
      res.status(200).json({dialogues});
    }
    try {
      if (req.headers.who === '1') {
        let token = req.headers.token;
        let tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
        let { id } = tokenDecoded;

        let roomList = await room.findAll({
          where: {giver_id:id},
          include: [
            {model: helper,
            required: false
            }
          ]
        });
        roomList.forEach((item) => {
          delete item.dataValues.helper.dataValues.password;
        })
        res.status(200).json({roomList});
      } else if (req.headers.who === '2') {
        let token = req.headers.token;
        let tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
        let { id } = tokenDecoded;

        let roomList = await room.findAll({
          where: {helper_id:id},
          include: [
            {model: giver,
            required: false
            }
          ]
        });
        roomList.forEach((item) => {
          delete item.dataValues.giver.dataValues.password;
        })
        res.status(200).json({roomList});
      }
    } catch (e) {
      res.status(500).json({message: 'internal server erorr'});
    }
  },
  post: async (req, res) => {
    const url = await generateUploadURL();

    const imageUrl = url.split('?')[0];

    const saveImgMessage = await message.create({
      room_id: req.body.roomId,
      giver_id: req.body.giverId,
      helper_id: req.body.helperId,
      type: req.body.type,
      img: imageUrl,
      gifticon_id: 0
    })
 
    res.status(200).json({url: url});
  }
};