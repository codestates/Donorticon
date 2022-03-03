import styled from 'styled-components';

export const HelperCategoryContainer = styled.div`
  background-color: ${({ theme }) => theme.color.main};
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export const HelperCategoryBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  @media ${({ theme }) => theme.device.tablet} {
    overflow-y: hidden;
    overflow-x: scroll;
    display: inline-block;
    white-space: nowrap;
    // 스크롤바 숨기기
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export const HelperContent = styled.div`
  text-align: center;
  margin: 0 20px;
  @media ${({ theme }) => theme.device.tablet} {
    justify-content: space-around;
    display: inline-block;
  }
`;

export const ImageBackground = styled.div`
  width: 65px;
  height: 65px;
  background-color: ${(props) => props.theme.color.mainDark};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    background-color: #fff;
  }
`;

export const Image = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

export const Name = styled.div`
  padding-top: 10px;
  &.active {
    font-weight: 700;
  }
`;

export const NoMessage = styled.div`
  padding: 200px 0;
  font-size: 20px;
  height: 500px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;
