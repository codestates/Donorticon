module.exports = {
	put: async (req, res) => {
		try {
			console.log(req.body, req.query, req.headers);
		} catch(err) {
			console.log(err);
		}
	}
}