const { helper, helper_vulnerable } = require('../../models');

module.exports = {
  getFilteredList: async (req, res) => {
    // req.params로 넘어오는 id가 0에서 7 사이어야함

    //TODO: req.params 정보가 넘어오지 않았을때 에러 처리
    // if (!req.params) {
    // }

    const id = parseInt(req.params.id);

    let page = Math.abs(parseInt(req.query.page));
    let limit = Math.abs(parseInt(req.query.limit));

    page = !isNaN(page) ? page : 1;
    limit = !isNaN(limit) ? limit : 9;

    const skip = (page - 1) * limit;

    //TODO: 에러 처리(id값은 0부터 7까지만 가능)
    // if (id < 0 || id > 7) {
    // }

    if (id === 0) {
      try {
        //TODO: gallery 모델과 helper 모델 id로 연결해서 이미지 한개 끌어와야함
        const allList = await helper.findAndCountAll({
          limit,
          offset: skip,
          where: {},
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
        const { count, rows: list } = allList;
        const maxPage = Math.ceil(count / limit);
        res.send({ list, maxPage });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const filteredList = await helper_vulnerable.findAndCountAll({
          limit,
          offset: skip,
          where: { vulnerable_id: id },
          include: {
            model: helper,
            required: true,
            attributes: ['id', 'name', 'slogan', 'img'],
          },
        });
        const { count, rows: list } = filteredList;
        const maxPage = Math.ceil(count / limit);
        res.send({ list, maxPage });
      } catch (e) {
        console.log(e);
      }
    }
  },
};
