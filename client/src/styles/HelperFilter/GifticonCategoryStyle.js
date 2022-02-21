import styled from 'styled-components';

export const GifticonCategoryContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GifticonCategoryBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

export const GifticonContent = styled.div`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.color.main};
    border: 2px solid ${({ theme }) => theme.color.main};
  }
`;
