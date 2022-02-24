const jwt = require('jsonwebtoken');
const {
  helper,
  helper_vulnerable,
  helper_gifticon_category,
	gallery
} = require('../../models');
const generateUploadURL = require('../s3');

module.exports = {
  get: async (req, res) => {
    try {
      const token = req.headers.token;
			console.log({ endPoint: '/mypage/helper', method: 'get', token })
			const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
      const { id } = tokenDecoded;
      const helper_vulnerableRow = await helper_vulnerable.findAll({
        where: { helper_id: id },
      });
      const helper_gifticon_categoryRow =
        await helper_gifticon_category.findAll({
          where: { helper_id: id },
        });
			const galleryRow = await gallery.findAll({
				where: { helper_id: id }
			});
			// console.log({gallery: galleryRow.dataValues})
      const vulnerableList = helper_vulnerableRow.map((el) =>
        el.dataValues.vulnerable_id,
      );
      const gifticonCategoryList = helper_gifticon_categoryRow.map((el) =>
        el.dataValues.gifticon_category_id,
      );
      const galleryList = galleryRow.map((el) =>
        el.dataValues.img,
      );
			const helperInfo = await helper.findOne({
				where: { id },
				attributes: { exclude: ['verification', 'verify_hash', 'password', 'createdAt', 'updatedAt'] },
			});

      const data = Object.assign(helperInfo.dataValues, { vulnerable: vulnerableList, gifticonCategory: gifticonCategoryList, gallery: galleryList } )
      // console.log(data)
			res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  },
  put: async (req, res) => {
    if (
      req.body.mobile ||
      req.body.name ||
      req.body.slogan ||
      req.body.description ||
			req.body.address ||
			req.body.tag === 'img' ||
			req.body.tag === 'gallery'
    ) {
      try {
        console.log(req.body)
				const token = req.headers.token;
				// console.log({ endPoint: '/mypage/helper', method: 'put', token })
				const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
				const { id } = tokenDecoded;
				const url = await generateUploadURL();
        if (req.body.mobile) {
          const { mobile } = req.body;
          await helper.update(
            { mobile },
            {
              where: { id },
            },
          );
        }
        if (req.body.name) {
          const { name } = req.body;
          await helper.update(
            { name },
            {
              where: { id },
            },
          );
        }
        if (req.body.slogan) {
          const { slogan } = req.body;
          await helper.update(
            { slogan },
            {
              where: { id },
            },
          );
        }
        if (req.body.description) {
					// console.log(req.body)
          const { description } = req.body;
          await helper.update(
            { description },
            {
              where: { id },
            },
          );
        }
        if (req.body.address) {
          const { address } = req.body;
          await helper.update(
            { location: address },
            {
              where: { id },
            },
          );
        }     
				if (req.body.tag === 'img') {
					console.log('이미지 변경 신청')
          await helper.update(
            { img: url.split('?')[0] },
            {
              where: { id },
            },
          );
					console.log({ tag: "img", url })
					return res.status(201).json({ url });
        }
				if (req.body.tag === 'gallery') {
					await gallery.create({ 
							helper_id: id,
							img: url.split('?')[0]
						})
					console.log({ tag: "gallery", url });
					return res.status(201).json({ url });
				}
        res.status(201).json({ message: "user information successfully changed" });
      } catch (e) {
        res.status(500).json({ message: 'server error' });
      } 
    } else {
      res.status(422).json({ message: 'insufficient parameters supplied' });
    } 
  },
};