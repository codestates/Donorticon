const jwt_decode = require('jwt-decode');
const { helper, helper_vulnerable, helper_gifticon_category } = require('../../models');

module.exports = {
	get: async (req, res) => {
		try {
			const token = req.headers.token;
			const tokenDecoded = jwt_decode(token);
			const { id, email, name, mobile, slogan, description, location, img } = tokenDecoded;
			const helperRow = await helper.findOne({
				where: { email }
			});
			const helperId = helperRow.id;
			const helper_vulnerableRow = await helper_vulnerable.findAll({
				where: { helper_id: helperId }
			});
			const helper_gifticon_categoryRow = await helper_gifticon_category.findAll({
				where: { helper_id: helperId }
			});
			const vulnerableList = helper_vulnerableRow.map(el => Number(el.dataValues.vulnerable_id));
			const gifticonCategoryList =  helper_gifticon_categoryRow.map(el => Number(el.dataValues.gifticon_category_id));
			
			const data = { id, email, name, mobile, slogan, description, location, vulnerable: vulnerableList, gifticonCategory: gifticonCategoryList, gallery: ['사진추가예정'], img }
			
			res.status(200).json(data);
		} catch(err) {
			console.log(err);
		}
	}
}

