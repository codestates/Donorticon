const jwt = require('jsonwebtoken');
const { helper_gifticon_category } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      console.log(req.body)
      const gifticonCategoryId = req.body.gifticon_id;
			const token = req.headers.authorization.split(' ')[1];
			const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
      const helperId = tokenDecoded.id;
      await helper_gifticon_category.create({
        helper_id: helperId,
        gifticon_category_id: gifticonCategoryId,
      });
      res.status(201).json({ message: 'data successfully added' });
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    console.log('삭제 작동중');
    try {
      const gifticonCategoryId = req.query.gifticon_id;
			const token = req.headers.authorization.split(' ')[1];
			const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
      const helperId = tokenDecoded.id;
      await helper_gifticon_category.destroy({
        where: {
          helper_id: helperId,
          gifticon_category_id: gifticonCategoryId,
        },
      });
      res.json({ message: 'data successfully deleted' });
    } catch (err) {
      console.log(err);
    }
  },
};
