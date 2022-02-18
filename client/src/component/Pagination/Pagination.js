import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import createPagination from './createPagination';

const Container = styled.div`
  display: flex;

  padding: 40px 0;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  .disabled {
    color: #e0e0e0;
    pointer-events: none;
  }

  li {
    padding: 10px 15px;
    margin-right: 4px;
    border-radius: 10px;
    text-align: center;
    user-select: none;

    &:last-child {
      margin-right: 0px;
    }

    &:not(.active):not(.disabled) {
      cursor: pointer;
    }

    &:not(.active):not(.disabled):active {
      border: 1px solid ${({ theme }) => theme.color.main};
    }

    &.active {
      background: ${({ theme }) => theme.color.main};
      border: 1px solid ${({ theme }) => theme.color.main};
    }
    &.disabled {
      color: #e0e0e0;
      pointer-events: none;
    }
  }
`;

const Pagenation = ({ maxPage, currentPage, setCurrentPage, count }) => {
  const { pagination } = createPagination({
    numberOfPageNumBtn: 5,
    currentPage,
    maxPage,
  });
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Ul>
        <FaAngleLeft
          size="18"
          style={{ marginRight: '5px' }}
          className={`${pagination[0] === currentPage && 'disabled'}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        />
        {pagination.map((page, idx) => (
          <li
            key={idx}
            className={`${currentPage === page && 'active'}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <FaAngleRight
          size="18"
          style={{ marginLeft: '5px' }}
          className={`${pagination.reverse()[0] === currentPage && 'disabled'}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        />
      </Ul>
    </Container>
  );
};

export default Pagenation;
