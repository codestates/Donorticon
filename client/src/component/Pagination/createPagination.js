const createPagination = (params) => {
  // numberOfPageNumBtn: 페이지에서 보일 페이지들 갯수 => donorticon의 경우 5개
  // src/Pagination/Pagination.js에서 아래와 같이 설정함
  //  const { pagination } = createPagination({
  //   numberOfPageNumBtn: 5,
  //   currentPage,
  //   maxPage,
  // });

  const { currentPage, numberOfPageNumBtn, maxPage } = params;

  // 현재 있는 페이지 넘버가 총 페이지 갯수보다 커지거나, 페이지 넘버가 1보다 작은 경우
  // pagination 값 초기화
  if (currentPage > maxPage || currentPage < 1)
    return {
      pagination: [],
      currentPage,
    };

  // maxPage = 3 인경우,
  // buttons = [1, 2, 3]
  const pageNumBtn = Array(maxPage)
    .fill(1)
    .map((x, idx) => x + idx);

  // numberOfPageNumBtn = 5 인경우,
  // 5 % 2 === 0 => 2로 나눈 나머지가 0이 아니니까 거짓
  // 거짓이면, 5 - 1 / 2 = 2
  // sideBtn = 2

  // 즉, 5개 페이지 숫자를 보일경우, 가운데 페이지를 기준으로 양쪽에 몇개의 페이지 넘버를
  // 출력할 건지 정하는 것이 sideBtn

  const sideBtn =
    numberOfPageNumBtn % 2 === 0
      ? numberOfPageNumBtn / 2
      : (numberOfPageNumBtn - 1) / 2;

  const calculLeft = (rest = 0) => {
    return {
      // pageNumBtn = 5  => 5 페이지에 있는 경우
      // page 넘버 보이는게 3 4 5 6 7 이렇게 보이게끔 설정
      // 5를 기준으로 왼쪽 수들인 3과 4를 얻어내는 과정이
      // 아래 array 부분
      array: pageNumBtn
        .slice(0, currentPage - 1)
        .reverse()
        .slice(0, sideBtn + rest)
        .reverse(),
      rest: function () {
        console.log(sideBtn, this);
        return sideBtn - this.array.length;
      },
    };
  };

  const calculRight = (rest = 0) => {
    return {
      array: pageNumBtn.slice(currentPage).slice(0, sideBtn + rest),
      rest: function () {
        return sideBtn - this.array.length;
      },
    };
  };

  const leftBtn = calculLeft(calculRight().rest()).array;
  const rightBtn = calculRight(calculLeft().rest()).array;

  return {
    pagination: [...leftBtn, currentPage, ...rightBtn],
    currentPage,
  };
};

export default createPagination;
