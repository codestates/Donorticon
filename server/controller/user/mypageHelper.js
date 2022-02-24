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
			const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
      const { id, email, name, mobile, slogan, description, location, img, activity } =
        tokenDecoded;
			console.log('마이페이지 조회 성공');
      const helperRow = await helper.findOne({
        where: { email },
      });
      const helperId = helperRow.id;
      const helper_vulnerableRow = await helper_vulnerable.findAll({
        where: { helper_id: helperId },
      });
      const helper_gifticon_categoryRow =
        await helper_gifticon_category.findAll({
          where: { helper_id: helperId },
        });
      const vulnerableList = helper_vulnerableRow.map((el) =>
        Number(el.dataValues.vulnerable_id),
      );
      const gifticonCategoryList = helper_gifticon_categoryRow.map((el) =>
        Number(el.dataValues.gifticon_category_id),
      );

      const data = {
        id,
        email,
        name,
        mobile,
        slogan,
        description,
        location,
        vulnerable: vulnerableList,
        gifticonCategory: gifticonCategoryList,
        gallery: ['사진추가예정'],
        img,
				activity
      };

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  },
  put: async (req, res) => {
		console.log(req.body.tag === 'img', '태그')
    const token = req.headers.token;
		const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const { id } = tokenDecoded;
		const url = await generateUploadURL();
    if (
      req.body.password ||
      req.body.mobile ||
      req.body.name ||
      req.body.slogan ||
      req.body.description ||
			req.body.address ||
			req.body.activity ||
			req.body.tag === 'img' ||
			req.body.tag === 'gallery'
    ) {
      try {
        const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
        const { id } = tokenDecoded;
        if (req.body.password) {
          const { password } = req.body;
          await helper.update(
            { password },
            {
              where: { id },
            },
          );
        }
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
					console.log(req.body)
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
        if (req.body.activity) {
          const { activity } = req.body;
          await helper.update(
            { activity },
            {
              where: { id },
            },
          );
        }        
				if (req.body.tag === 'img') {
					console.log('이미지 변경 신청')
          await helper.update(
            { img: url },
            {
              where: { id },
            },
          );
        }
				if (req.body.tag === 'gallery') {
					console.log({ url })
					await gallery.create({ 
							helper_id: id,
							img: url
						})
					return res.status(201).json({ url });
				}
        const helperFinder = await helper.findOne({
          where: { id },
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
        const helperInfo = helperFinder.dataValues;
        res.clearCookie('refreshToken');
        const refreshToken = jwt.sign(helperInfo, process.env.ACCESS_SECRET, {
          expiresIn: '6h',
        });
        res.status(201).json({ helperInfo, token:refreshToken });
      } catch (e) {
        res.status(500).json({ message: 'server error' });
      }
    } else {
      res.status(422).json({ message: 'insufficient parameters supplied' });
    }
  },
};
