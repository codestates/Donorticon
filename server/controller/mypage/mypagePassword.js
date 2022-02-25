const { helper, giver } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
	try {
		if (req.body.newPassword) {
			const token = req.headers.authorization.split(' ')[1];
			const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
			if (!tokenDecoded) {
				return res.status(401).json({ message: 'invalid token' })
			}
			const { id, user_type } = tokenDecoded;
			if ( user_type === 1) {
				await giver.update(
					{ password: req.body.newPassword }, 
					{
						where: { id }
					}
				);
				res.status(200).json({ message: 'giver password changed successfully' })
			} else if (user_tpye === 2) {
				await helper.update(
					{ password: req.body.newPassword }, 
					{
						where: { id }
					}
				);
				res.status(200).json({ message: 'helper password changed successfully' })			}
		} else {
			res.status(422).json({ message: 'insufficient parameters supplied' })
		}
	} catch(err) {
		console.log(err);
	}
}
