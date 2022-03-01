import styled from 'styled-components';

export const GifticonCategoryContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GifticonCategoryBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  @media ${({ theme }) => theme.device.tablet} {
    overflow-x: scroll;
    display: inline-block;
    white-space: nowrap;
    // 스크롤바 숨기기
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export const GifticonContent = styled.div`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.color.main};
    border: 2px solid ${({ theme }) => theme.color.main};
  }
  @media ${({ theme }) => theme.device.tablet} {
    display: inline-block;
  }
`;
