const { helper, vulnerable, helper_vulnerable, gifticon_category, helper_gifticon_category } = require('../../models');

module.exports = async (req, res) => {
  console.log(req.body);
  const { name, email, password, img, location, slogan, description, vulnerableName, gifticonCategoryName } = req.body;
  if (name && email && password && location && slogan && description && vulnerableName && gifticonCategoryName) { 
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

      // const vulnerableRow = await vulnerable.findOne({
      //   where: { id: vulnerableName }
      // });
      // const vulnerableId = vulnerableRow.id;
      // const vulnerables = vulnerableName.map(async val => {
      //   const vulnerableid = vulnerable.findOne({
      //     where: { name: val}
      //   });
      //   return vulnerableid;
      // })
      console.log(vulnerableName)
      const [vulnerableFound, vulnerableCreated] = await helper_vulnerable.findOrCreate({
        where: { helper_id: helperId },
        defaults: { vulnerable_id: vulnerableName }
      });

      const gifticonCategoryRow = await gifticon_category.findOne({
        where: { id: gifticonCategoryName }
      });
      const gifticonCategoryId = gifticonCategoryRow.id;
      const [gifticonCategoryFound, gifticonCategoryCreated] = await helper_gifticon_category.findOrCreate({
        where: { helper_id: helperId},
        defaults: { gifticon_category_id: gifticonCategoryId }
      });
      if (helperCreated && vulnerableCreated && gifticonCategoryCreated) {
        return res.status(200).json('successfully signed up');
      } 
    } catch(err) {
      res.send(err);
    }
  } else {
    return res.status(422).json('insufficient parameter supplied') 
  }  
}