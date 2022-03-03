const createPagination = (info) => {
  const { currentPage, numberOfPage, maxPage } = info;

  if (currentPage > maxPage || currentPage < 1) {
    return {
      pagination: [],
      currentPage,
    };
  }

  const pageNumList = Array(maxPage)
    .fill(1)
    .map((x, idx) => x + idx);

  const sideBtn =
    numberOfPage % 2 === 0 ? numberOfPage / 2 : (numberOfPage - 1) / 2;

  const calculLeft = (rest = 0) => {
    return {
      array: pageNumList
        .slice(0, currentPage - 1)
        .reverse()
        .slice(0, sideBtn + rest)
        .reverse(),
      rest: function () {
        return sideBtn - this.array.length;
      },
    };
  };

  const calculRight = (rest = 0) => {
    return {
      array: pageNumList.slice(currentPage).slice(0, sideBtn + rest),
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
