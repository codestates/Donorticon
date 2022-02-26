const {
  helper,
  helper_vulnerable,
  helper_gifticon_category,
} = require('../../models');

module.exports = {
  getFilteredList: async (req, res) => {
    //TODO: req.params 정보가 넘어오지 않았을때 에러 처리
    // if (!req.params) {
    // }

    const helperCategoryId = parseInt(req.params.id);
    const gifticonCategoryId = parseInt(req.query.gifticon);

    let page = Math.abs(parseInt(req.query.page));
    let limit = Math.abs(parseInt(req.query.limit));

    page = !isNaN(page) ? page : 1;
    limit = !isNaN(limit) ? limit : 9;

    const skip = (page - 1) * limit;

    if (helperCategoryId === 0 && gifticonCategoryId === 0) {
      try {
        //TODO: gallery 모델과 helper 모델 id로 연결해서 이미지 한개 끌어와야함
        const allList = await helper.findAndCountAll({
          limit,
          offset: skip,
          where: { activity: true, verification: 1 },
          order: [['id', 'DESC']],
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
        const allList = await helper_gifticon_category.findAndCountAll({
          limit,
          offset: skip,
          where: { gifticon_category_id: gifticonCategoryId },
          order: [['id', 'DESC']],
          include: {
            model: helper,
            required: true,
            where: { activity: true, verification: 1 },
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
          order: [['id', 'DESC']],
          include: [
            {
              model: helper,
              required: true,
              where: { activity: true, verification: 1 },
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
          raw: true,
          limit,
          offset: skip,
          where: {
            vulnerable_id: helperCategoryId,
          },
          include: [
            {
              model: helper,
              required: true,
              where: { activity: true, verification: 1 },
              attributes: ['id'],
            },
          ],
        });
        const { rows } = filteredList;
        const idList = rows.map((x) => x.helper_id);
        const filteredAgain = await helper_gifticon_category.findAndCountAll({
          limit,
          offset: skip,
          where: {
            helper_id: idList,
            gifticon_category_id: gifticonCategoryId,
          },
          include: [
            {
              model: helper,
              required: true,
              attributes: ['id', 'name', 'slogan', 'img'],
            },
          ],
          order: [[{ model: helper }, 'id', 'DESC']],
        });
        const { count, rows: list } = filteredAgain;
        const maxPage = Math.ceil(count / limit);
        res.send({ list, maxPage });
      } catch (e) {
        console.log(e);
      }
    }
  },
};
