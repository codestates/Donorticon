const jwt = require('jsonwebtoken');
const { giver } = require('../../models');

module.exports ={
	get: async (req, res) => {
		try {
			const token = req.headers.token;
			const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
			const { id, email, name, mobile, img } = tokenDecoded;
			res.status(200).json({ email, name, mobile, img })
		} catch(err) {
			console.log(err);
		}
	},
	put: async (req, res) => {
    if (req.body.password || req.body.mobile || req.body.name) {
      try {
				const token = req.headers.token;
				const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
				console.log(tokenDecoded);
				const { id } = tokenDecoded;
        if (req.body.password) {
          const { password } = req.body;
          await giver.update(
            { password },
            {
              where: { id },
            }
          );
        }
        if (req.body.mobile) {
          const { mobile } = req.body;
          await giver.update(
            { mobile },
            {
              where: { id },
            }
          );
        }
        if (req.body.name) {
          const { name } = req.body;
          await giver.update(
            { name },
            {
              where: { id },
            }
          );
        }
        const giverFinder = await giver.findOne({
          where: { id },
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
        const giverInfo = giverFinder.dataValues;
        res.clearCookie('refreshToken');
        const refreshToken = jwt.sign(giverInfo, process.env.REFRESH_SECRET, {
          expiresIn: '6h',
        });
				// console.log(refreshToken);
        res.status(200).json({ giverInfo, token: refreshToken });
      } catch (e) {
        res.status(500).json({ message: 'server error' });
      }
    } else {
      res.status(422).json({ message: 'insufficient parameters supplied' });
    }
  }
}