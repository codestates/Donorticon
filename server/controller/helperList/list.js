const { helper, gifticon, message } = require('../../models');
const generateUploadURL = require('../s3')

module.exports = {
  getDetail: async (req, res) => {
    try {
      const helperId = req.params.id;
      const data = await helper.findOne({ where: { id: helperId } });
      delete data.password;
      delete data.verification;
      delete data.verify_hash;
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'intenal server error' });
    }
  },
  donate: async (req, res) => {
    const url = await generateUploadURL();
    const messageFromGiver = req.body.message;
    try{
      const imageUrl = url.split('?')[0];

      const insertGifticon = await gifticon.create({
        giver_id: req.body.giverId,
        helper_id: req.body.helperId,
        img: imageUrl,
        status: "checking"
      })
      
      if (messageFromGiver) {
        await message.create({
          room_id: '1',
          giver_id: req.body.giverId,
          helper_id: req.body.helperId,
          gifticon_id: insertGifticon.dataValues.id,
          message: messageFromGiver,
          img: imageUrl
        })
      }

      res.status(200).json({url: url});
    } catch (e) {
      res.status(500).json({message: "intenal server error"})
    }
  }
};
