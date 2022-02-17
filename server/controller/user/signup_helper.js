const { helper, vulnerable, helper_vulnerable, gifticon_category, helper_gifticon_category } = require('../../models');

const getIdList = async (listToConvert, modelName) => {
  let idList = listToConvert;
  idList = idList.map(el => { return { name: el }});
  const { Op } = require("sequelize");
  idList = await modelName.findAll({
    where: {
      [Op.or]: idList
    }
  });
  idList = idList.map(el => el.dataValues.id);
  return idList
};

module.exports = async (req, res) => {
  const { name, email, password, img, location, slogan, description, vulnerableName, gifticonCategoryName } = req.body;
  if (name && email && password && location && vulnerableName && gifticonCategoryName) { 
    try {
      const [helperFound, helperCreated] = await helper.findOrCreate({
        where: { name, email },
        defaults: { password, img, user_type: 2, slogan, description, location, activity: true }
      }); 
      if (!helperCreated) {
        return res.status(409).json({ message: "email already exists" })
      }
      const helperRow = await helper.findOne({
        where: { name }
      });
      const helperId = helperRow.id;

      let vulnerableList = await getIdList(vulnerableName, vulnerable);
      console.log(vulnerableList);

      const [vulnerableFound, vulnerableCreated] = await helper_vulnerable.findOrCreate({
        where: { helper_id: helperId },
        defaults: { vulnerable_id: vulnerableList }
      });

      let gifticonCategoryList = await getIdList(gifticonCategoryName, gifticon_category);

      const [gifticonCategoryFound, gifticonCategoryCreated] = await helper_gifticon_category.findOrCreate({
        where: { helper_id: helperId },
        defaults: { gifticon_category_id: gifticonCategoryList }
      });
      if (helperCreated && vulnerableCreated && gifticonCategoryCreated) {
        return res.status(200).json('successfully signed up');
      } 
    } catch(err) {
      console.log(err)
    }
  } else {
    return res.status(422).json('insufficient parameter supplied') 
  }  
}