const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { helper_vulnerable } = require('../../models');

module.exports = {
	post: async (req, res) => {
		try {
			const vulnerableId = req.body.vulnerable_id;
			const { token } = req.headers;
			const tokenDecoded = jwt_decode(token);
			const helperId = tokenDecoded.id;
			await helper_vulnerable.create({
				helper_id: helperId,
				vulnerable_id: vulnerableId
			});
			res.status(201).json({ message: "data successfully added"});
		} catch(err) {
			console.log(err);
		}
	},
	delete: async (req, res) => {
		try {
			console.log('파라미터', req.query);
			const vulnerableId = req.body.vulnerable_id;
			const { token } = req.headers;
			const tokenDecoded = jwt_decode(token);
			const helperId = tokenDecoded.id;
			console.log(tokenDecoded);
			await helper_vulnerable.destroy({
				helper_id: helperId,
				vulnerable_id: vulnerableId
			});
			res.json({ message: "data successfully deleted"});
		} catch(err) {
			console.log(err);
		}
	}
}