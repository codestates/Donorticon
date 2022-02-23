import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  padding: 40px 0;
  justify-content: center;
`;

export const PaginationUl = styled.ul`
  list-style: none;
  padding: 0px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  .left {
    margin-right: 5px;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.main};
    }
  }

  .right {
    margin-left: 5px;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.main};
    }
  }

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
    cursor: pointer;

    &:last-child {
      margin-right: 0px;
    }

    &.active {
      background: ${({ theme }) => theme.color.main};
      border: 1px solid ${({ theme }) => theme.color.main};
    }
  }
`;
