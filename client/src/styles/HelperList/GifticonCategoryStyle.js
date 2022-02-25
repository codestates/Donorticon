import styled from 'styled-components';

export const GifticonCategoryContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GifticonCategoryBox = styled.div`
  display: flex;

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    padding: 0 40px;
  }
`;

export const GifticonContent = styled.div`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 15px;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.color.main};
    border: 2px solid ${({ theme }) => theme.color.main};
  }
  @media ${({ theme }) => theme.device.tablet} {
    white-space: nowrap;
  }
`;
