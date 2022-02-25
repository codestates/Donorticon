const { helper, giver } = require('../../models');
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
				res.status(200).json({ message: 'giver account successfully deleted' })
			} else if (user_type === 2) {
				await helper.destroy(
					{
						where: { id }
					}
				);
				res.status(200).json({ message: 'helper account successfully deleted' })			
			}
	} catch(err) {
		console.log(err);
	}
}
