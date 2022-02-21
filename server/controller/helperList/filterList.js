const {
  helper,
  helper_vulnerable,
  gifticon_category,
} = require('../../models');

module.exports = {
  getFilteredList: async (req, res) => {
    // req.params로 넘어오는 id가 0에서 7 사이어야함

    //TODO: req.params 정보가 넘어오지 않았을때 에러 처리
    // if (!req.params) {
    // }

    const helperCategoryId = parseInt(req.params.id);
    const gifticonCategoryId = parseInt(req.query.gifticon);

    console.log(helperCategoryId, gifticonCategoryId);

    let page = Math.abs(parseInt(req.query.page));
    let limit = Math.abs(parseInt(req.query.limit));

    page = !isNaN(page) ? page : 1;
    limit = !isNaN(limit) ? limit : 9;

    const skip = (page - 1) * limit;

    //TODO: 에러 처리(id값은 0부터 7까지만 가능)
    // if (id < 0 || id > 7) {
    // }

    if (helperCategoryId === 0 && gifticonCategoryId === 0) {
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
    } else if (helperCategoryId === 0 && gifticonCategoryId !== 0) {
      // 핼퍼카테고리는 전체보기
      // 기프티콘카데로리는 전체보기가 아닌 경우
      try {
        //TODO: gallery 모델과 helper 모델 id로 연결해서 이미지 한개 끌어와야함
        const allList = await helper_vulnerable.findAndCountAll({
          limit,
          offset: skip,
          where: { gifticon_category_id: gifticonCategoryId },
          include: {
            model: helper,
            required: true,
            attributes: ['id', 'name', 'slogan', 'img'],
          },
        });
        const { count, rows: list } = allList;
        const maxPage = Math.ceil(count / limit);
        res.send({ list, maxPage });
      } catch (e) {
        console.log(e);
      }
    } else if (helperCategoryId !== 0 && gifticonCategoryId === 0) {
      // 핼퍼카테고리가 전체보기가 아닌경우
      // 기프티콘카테고리는 전체보기
      try {
        const filteredList = await helper_vulnerable.findAndCountAll({
          limit,
          offset: skip,
          where: {
            vulnerable_id: helperCategoryId,
          },
          include: [
            {
              model: helper,
              required: true,
              attributes: ['id', 'name', 'slogan', 'img'],
            },
          ],
        });

        const { count, rows: list } = filteredList;
        const maxPage = Math.ceil(count / limit);
        res.send({ list, maxPage });
      } catch (e) {
        console.log(e);
      }
    } else {
      // 둘다 전체보기가 아닌 경우
      try {
        const filteredList = await helper_vulnerable.findAndCountAll({
          limit,
          offset: skip,
          where: {
            vulnerable_id: helperCategoryId,
            gifticon_category_id: gifticonCategoryId,
          },
          include: [
            {
              model: helper,
              required: true,
              attributes: ['id', 'name', 'slogan', 'img'],
            },
          ],
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
