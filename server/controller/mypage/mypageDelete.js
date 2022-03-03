const { 
	helper, 
	giver, 
	gifticon, 
	message, 
	room, 
	helper_gifticon_category,  
	helper_vulnerable,
} = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
			if (!tokenDecoded) {
				return res.status(401).json({ message: 'invalid token' })
			}
			const { id, user_type } = tokenDecoded;
			if ( user_type === 1) {
				await giver.destroy(
					{
						where: { id }
					}
				);
				await gifticon.destroy(
					{
						where: { giver_id: id }
					}
				);
				await message.destroy(
					{
						where: { giver_id: id }
					}
				);
				await room.destroy(
					{
						where: { giver_id: id }
					}
				);
				res.status(200).json({ message: 'giver account successfully deleted' })
			} else if (user_type === 2) {
				await helper.destroy(
					{
						where: { id }
					}
				);
				await helper_vulnerable.destroy(
					{
						where: { helper_id: id }
					}
				);
				await helper_gifticon_category.destroy(
					{
						where: { helper_id: id }
					}
				);
				await message.destroy(
					{
						where: { helper_id: id }
					}
				);
				await room.destroy(
					{
						where: { helper_id: id }
					}
				)
				await gifticon.destroy(
					{
						where: { helper_id: id }
					}
				)
				res.status(200).json({ message: 'helper account successfully deleted' })			
			}
	} catch(err) {
		res.status(500).json({ message: 'internal server error' })
	}
}
