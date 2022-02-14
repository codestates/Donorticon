require("dotenv").config();
const { giver, helper, gifticon } = require('../../models')

module.exports = {

  get: async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    //fetch from jwt or header 
    const id = 1;
    //need to divide cases to giver and helper
    const gifticonList = await gifticon.findAll({where:{giver_id:id}}) 
    const userInfo = await giver.findAll({where:{id:id}})
    res.status(200).json({gifticonList: gifticonList, userInfo: userInfo, message:"successfully get data"})
  }
}