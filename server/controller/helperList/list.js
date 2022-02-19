const { helper } = require('../../models');

module.exports = {
  getDetail: async (req, res) => {
    try {
      const helperId = req.params.id;
      const data = await helper.findOne({ where: { id: helperId } });
      delete data.password;
      delete data.verification;
      delete data.verify_hash;
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'intenal server error' });
    }
  },
  donate: () => {},
};
