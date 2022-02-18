const jwt = require('jsonwebtoken');
const { gifticon, helper } = require('../../models');

module.exports = {
  getDetail: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'invalid token' });
    }
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.headers.authorization;

    if (token === 'null') {
      return res.status(401).send({ message: 'invalid token' });
    }

    const user = jwt.verify(token, process.env.ACCESS_SECRET);

    if (!user) {
      return res.status(401).send('invalid token');
    }

    if (token && user) {
      const { id } = req.params;
      const { user_type } = user;
      let gifticonInfo;

      if (Number(user_type) === 1) {
        try {
          gifticonInfo = await gifticon.findOne({
            where: { id },
            include: {
              model: helper,
              required: true,
              attributes: ['name'],
            },
          });
        } catch (e) {
          console.log(e);
        }
      }

      res.status(200).send({ gifticonInfo });
    }
  },
  changeStatus: async (req, res) => {
    // status 수정은 helper만 가능
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.ACCESS_SECRET);
    const { user_type } = user;

    if (token && user_type === 2) {
      const { status } = req.body;
      const { id } = req.params;

      let statusName;

      if (status === '사용함') {
        statusName = 'used';
      } else if (status === '수락함') {
        statusName = 'accepted';
      } else if (status === '확인중') {
        statusName = 'checking';
      } else if (status === '거절됨') {
        statusName = 'rejected';
      } else if (status === '만료됨') {
        statusName = 'expired';
      }

      try {
        await gifticon.update({ status: statusName }, { where: { id } });
        const data = await gifticon.findOne({ where: { id } });
        res.status(200).send(data);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
