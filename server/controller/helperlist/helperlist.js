const { helper } = require('../../models');

module.exports = {
  getList: async (req, res) => {
    // parseInt 함수 사용 이유
    // Query string은 문자열로 전달되기 때문에 숫자가 아닐 수도 있고, 정수(소수점이 없음)를 읽어내기 위해 사용
    // Math.max 함수 사용 이유
    // page, limit은 양수이어야 함. 최소 1은 되어야 함.
    let page = Math.max(parseInt(req.query.page));
    let limit = Math.max(parseInt(req.query.limit));

    // 입력된 query 값이 정수로 변환될 수 없을때 => 기본값 1로 설정
    page = !isNaN(page) ? page : 1;
    limit = !isNaN(limit) ? limit : 9;

    console.log(page, limit);

    // 5. Promise 앞에 await키워드를 사용하면,
    // 해당 Promise가 완료될 때까지 다음 코드로 진행하지 않고 기다렸다가
    // 해당 Promise가 완료되면 resolve된 값을 반환(return) 합니다.
    // Post.countDocuments({}) 함수를 사용해서 { }에 해당하는({} == 조건이 없음, 즉 모든) post의 수를 DB에서 읽어 온 후 count변수에 담았습니다.

    // 무시할 게시물 수
    // 2 페이지를 클릭하면, DB에서 처음 9개 게시물을 무시하고 10번째부터 9개의 게시물을 보여줌
    const skip = (page - 1) * limit;

    // res.render('posts/index', {
    //   posts: posts,
    //   currentPage: page, // 9
    //   maxPage: maxPage, // 9
    //   limit: limit, // 9
    // });

    try {
      //TODO: gallery 모델과 helper 모델 id로 연결해서 이미지 한개 끌어와야함

      // helper가 총 몇 명인지 먼저 불러오기
      // offset: quantity of items to skip 스킵할 아이템 갯수
      // limit: quantity of items to fetch 불러올 아이템 갯수

      const helperlist = await helper.findAndCountAll({
        limit: 9,
        offset: skip,
        where: {},
      });

      const { count, rows: list } = helperlist;

      // 총 페이지 개수 구하기
      const maxPage = Math.ceil(count / limit);
      res.send({ list, maxPage });
    } catch (e) {
      console.log(e);
    }
  },
};
