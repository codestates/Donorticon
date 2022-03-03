const { helper, vulnerable, helper_vulnerable, gifticon_category, helper_gifticon_category } = require('../../models');

const getForeignKeyIdList = async (listToConvert, modelName) => {
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
// ! 위 함수 설명
// 해당함수에서 ['아동청소년', '어르신'] 이라는 값을 인자로 넘겨주면 vulnerable 테이블에서 해당 배열의 요소 이름에 해당하는 아이디 번호를 조회해
// [1, 2]와 같은 값을 줌(gifticon_category 테이블에도 동일한 방식이 적용되게 함) 

module.exports = async (req, res) => {
  const { name, email, password, location, vulnerableName, gifticonCategoryName } = req.body;
  if (name && email && password && location && vulnerableName && gifticonCategoryName) { 
    try {
      const [helperFound, helperCreated] = await helper.findOrCreate({
        where: { email },
        defaults: { name, password, user_type: 2, location, activity: true, img: 'https://s3.ap-northeast-2.amazonaws.com/donorticon.shop/defaultprofile.jpg' }
      }); 
      if (!helperCreated) {
        return res.status(409).json({ message: "email already exists" })
      }
      const helperRow = await helper.findOne({
        where: { email }
      });
      const helperId = helperRow.id;

      let vulnerableList = await getForeignKeyIdList(vulnerableName, vulnerable);

      vulnerableList = vulnerableList.map(el => { 
        return {
          helper_id: helperId,
          vulnerable_id: el
        }
      });

      const helperVulnerableUpdated = await helper_vulnerable.bulkCreate(vulnerableList);
      // 해당 테이블에 여러 데이터를 순차적으로 insert

      let gifticonCategoryList = await getForeignKeyIdList(gifticonCategoryName, gifticon_category);
      gifticonCategoryList = gifticonCategoryList.map(el => { 
        return {
          helper_id: helperId,
          gifticon_category_id: el
      }
      });

      const gifticonCategoryUpdated = await helper_gifticon_category.bulkCreate(gifticonCategoryList);
      // 해당 테이블에 여러 데이터를 순차적으로 insert

      if (helperCreated && helperVulnerableUpdated && gifticonCategoryUpdated) {
        res.status(201).json({ message: 'sucessfully signed up', id: helperId});
      } 
    } catch(err) {
      res.status(500).json({ message: 'internal server error' });
    }
  } else {
    res.status(422).json('insufficient parameter supplied') 
  }  
}