const jwt = require('jsonwebtoken');
const { helper } = require('../../models');

module.exports = {
	put: async (req, res) => {
		try {
			const token = req.headers.token;
			const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
			const { id } = tokenDecoded;
			if (typeof req.body.activity === 'boolean') {
				await helper.update(
					{	activity: req.body.activity },
					{
						where: { id }
					}
				)
			}
			console.log(tokenDecoded);
		} catch(err) {
			console.log(err);
		}
	}
}