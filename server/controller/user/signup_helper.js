const { helper, vulnerable, helper_vulnerable, gifticon_category, helper_gifticon_category } = require('../../models');
const convertToArr = (param) => {
  let list = param.split(",");
  list[0] = list[0].substring(1);
  list[list.length - 1] = list[list.length - 1].substring(
    0,
    list[list.length - 1].length - 1
  );
  list.forEach((x, i) => {
    list[i] = list[i].includes('"') ? list[i].replaceAll('"', "").trim()
       : list[i].replaceAll("'", "").trim();
  });
  return list;
}; // "['children', 'elderly', 'female']" 과 같은 형식으로 데이터가 들어오는 데 이는 JSON 형식이 아님 따라서 별도의 변환 함수를 지정함
const getIdList = async (listToConvert, modelName) => {
  let idList = convertToArr(listToConvert);
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

      // let vulnerableList = convertToArr(vulnerableName);
 
      // vulnerableList = vulnerableList.map(el => { return { name: el }});

      // const { Op } = require("sequelize");
      // vulnerableList = await vulnerable.findAll({
      //   where: {
      //     [Op.or]: vulnerableList
      //   }
      // });

      // vulnerableList = vulnerableList.map(el => el.dataValues.id);
      let vulnerableList = await getIdList(vulnerableName, vulnerable);

      const [vulnerableFound, vulnerableCreated] = await helper_vulnerable.findOrCreate({
        where: { helper_id: helperId },
        defaults: { vulnerable_id: vulnerableList }
      });

      let gifticonCategoryList = await getIdList(gifticonCategoryName, gifticon_category);

      // const gifticonCategoryRow = await gifticon_category.findOne({
      //   where: { id: gifticonCategoryName }
      // });
      // const gifticonCategoryId = gifticonCategoryRow.id;
      const [gifticonCategoryFound, gifticonCategoryCreated] = await helper_gifticon_category.findOrCreate({
        where: { helper_id: helperId},
        defaults: { gifticon_category_id: gifticonCategoryList }
      });
      if (helperCreated && vulnerableCreated && gifticonCategoryCreated) {
        return res.status(200).json({ message: `welcome ${req.body.name}! you have sucessfully signed up`, id: userInfo.dataValues.id});
      } 
    } catch(err) {
      res.send(err);
    }
  } else {
    return res.status(422).json('insufficient parameter supplied') 
  }  
}