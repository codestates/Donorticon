import styled from 'styled-components';

export const HelperCategoryContainer = styled.div`
  background-color: ${({ theme }) => theme.color.main};
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HelperCategoryBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
export const HelperContent = styled.div`
  text-align: center;
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
