const {
  helper,
  gifticon,
  message,
  room,
  gallery,
  helper_vulnerable,
  helper_gifticon_category,
} = require('../../models');
const generateUploadURL = require('../s3');

module.exports = {
  getDetail: async (req, res) => {
    try {
      const helperId = req.params.id;
      const data = await helper.findOne({
        raw: true, 
        where: { id: helperId },
        attributes: ['img', 'slogan', 'name', 'description', 'location']
      });  
      const helper_vulnerableRow = await helper_vulnerable.findAll({
        where: { helper_id: helperId },
      });
      const helper_gifticon_categoryRow =
        await helper_gifticon_category.findAll({
          where: { helper_id: helperId },
        });
      const galleryRow = await gallery.findAll({
        where: { helper_id: helperId },
      });
      const vulnerableList = helper_vulnerableRow.map(
        (el) => el.dataValues.vulnerable_id,
      );
      const gifticonCategoryList = helper_gifticon_categoryRow.map(
        (el) => el.dataValues.gifticon_category_id,
      );
      const galleryList = galleryRow.map((el) => el.dataValues.img);
      const helperDetailInfo = Object.assign(data, {
        id: helperId,
        gallery: galleryList,
        vulnerable: vulnerableList,
        gifticonCategory: gifticonCategoryList,
      });
      res.status(200).json(helperDetailInfo);
    } catch (e) {
      res.status(500).json({ message: 'internal server error' });
    }
  },
  donate: async (req, res) => {
    const url = await generateUploadURL();
    const messageFromGiver = req.body.message;
    try {
      const imageUrl = url.split('?')[0];

      const insertGifticon = await gifticon.create({
        giver_id: req.body.giverId,
        helper_id: req.body.helperId,
        img: imageUrl,
        status: 'checking',
        report: false,
        point: 0,
      });

      const createDMRoom = await room.findOrCreate({
        where: {
          giver_id: req.body.giverId,
          helper_id: req.body.helperId,
        },
        defaults: {
          activity: 1,
        },
      });

      await message.create({
        room_id: createDMRoom[0].dataValues.id,
        giver_id: req.body.giverId,
        helper_id: req.body.helperId,
        gifticon_id: insertGifticon.dataValues.id,
        type: 1,
        message: messageFromGiver || '',
        img: imageUrl,
        thanksImg: false,
      });

      res.status(200).json({ url: url });
    } catch (e) {
      res.status(500).json({ message: 'internal server error' });
    }
  },
};
