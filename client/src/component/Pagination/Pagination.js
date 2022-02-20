import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import {
  PaginationContainer,
  PaginationUl,
} from '../../styles/PaginationStyle';
import createPagination from './createPagination';

const Pagination = ({ maxPage, currentPage, setCurrentPage }) => {
  const { pagination } = createPagination({
    numberOfPage: 5,
    currentPage,
    maxPage,
  });

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <PaginationContainer>
      <PaginationUl>
        <FaAngleDoubleLeft
          size="18"
          className={`${
            pagination[0] === currentPage ? 'disabled left' : 'left'
          }`}
          onClick={() => handleClick(1)}
        />
        <FaAngleLeft
          size="18"
          className={`${
            pagination[0] === currentPage ? 'disabled left' : 'left'
          }`}
          onClick={() => handleClick(currentPage - 1)}
        />
        {pagination.map((page, idx) => (
          <li
            key={idx}
            className={`${currentPage === page && 'active'}`}
            onClick={() => handleClick(page)}
          >
            {page}
          </li>
        ))}
        <FaAngleRight
          size="18"
          className={`${
            pagination.reverse()[0] === currentPage ? 'disabled right' : 'right'
          }`}
          onClick={() => handleClick(currentPage + 1)}
        />
        <FaAngleDoubleRight
          size="18"
          className={`${
            pagination[0] === currentPage ? 'disabled right' : 'right'
          }`}
          onClick={() => handleClick(maxPage)}
        />
      </PaginationUl>
    </PaginationContainer>
  );
};

export default Pagination;
