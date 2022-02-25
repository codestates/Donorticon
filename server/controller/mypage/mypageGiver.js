const jwt = require('jsonwebtoken');
const { giver } = require('../../models');
const generateUploadURL = require('../s3');

module.exports ={
	get: async (req, res) => {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (!tokenDecoded) {
        return res.status(401).json({ message: 'invalid token' });
      }
			const { id } = tokenDecoded;
			const giverInfo = await giver.findOne({
				where: { id },
				attributes: { exclude: ['verification', 'verify_hash', 'password', 'createdAt', 'updatedAt'] },
			});
      if (!giverInfo) {
        return res.status(404).json({ message: 'user not found' });
      }
			const data = giverInfo.dataValues;
			res.status(200).json(data)
		} catch(err) {
			console.log(err);
		}
	},
	put: async (req, res) => {
    if (req.body.mobile || req.body.name || req.body.tag === 'img') {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenDecoded = jwt.verify(token, process.env.ACCESS_SECRET);
          const { id } = tokenDecoded;
          const url = await generateUploadURL();
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
          if (req.body.tag === 'img') {
            await giver.update(
              { img: url.split('?')[0] },
              {
                where: { id },
              },
            );
            console.log(url);
            return res.status(200).json({ url });
          }
          res.status(200).json({ message: "user information successfully changed" });
      } catch (e) {
      console.log(e);
      }
    } else {
      res.status(422).json({ message: 'insufficient parameters supplied' });
    }
  }
}