import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import createPagination from './createPagenation';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0px;
  display: flex;
  li {
    padding: 10px 15px;
    margin-right: 4px;
    border-radius: 10px;

    font-size: 1.1rem;
    // min-width: 20px;
    text-align: center;
    user-select: none;

    &:last-child {
      margin-right: 0px;
    }

    &:not(.active):not(.disabled) {
      cursor: pointer;
    }
    // &:not(.active):not(.disabled):hover{
    //   background: #D65DB1;
    // }
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
    numberOfButtons: 5,
    currentPage,
    maxPage,
  });
  const handleClick = (page) => setCurrentPage(page);

  return (
    <Container>
      <Ul>
        <li
          className={`${pagination[0] === currentPage && 'disabled'}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        >
          Prev
          {/* <i class="fa fa-chevron-left" aria-hidden="true" /> */}
        </li>
        {pagination.map((page) => (
          <li
            className={`${currentPage === page && 'active'}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && 'disabled'}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          Next
        </li>
      </Ul>
    </Container>
  );
};

export default Pagenation;
