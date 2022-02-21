const jwt_decode = require('jwt-decode');
const { giver } = require('../../models');

module.exports ={
	get: async (req, res) => {
		try {
			const token = req.headers.token;
			const tokenDecoded = jwt_decode(token);
			const { id, email, name, mobile, img } = tokenDecoded;
			console.log(tokenDecoded)
			res.status(200).json({ email, name, mobile, img })
		} catch(err) {
			console.log(err);
		}
	},
	put: async (req, res) => {
    const token = req.headers.token;
		const tokenDecoded = jwt_decode(token);
		const { id } = tokenDecoded;
		console.log(req.body, "gfgf");
    if (req.body.password || req.body.mobile || req.body.name) {
      try {
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

        res.status(200).json(giverInfo);
      } catch (e) {
        res.status(500).json({ message: 'server qerror' });
      }
    } else {
      res.status(422).json({ message: 'insufficient parameters supplied' });
    }
  }
}