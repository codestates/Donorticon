import styled from 'styled-components';

export const CategoryContainer = styled.div`
  background-color: ${({ theme }) => theme.color.main};
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CategoryBox = styled.div`
  display: flex;
  cursor: pointer;
`;
export const CategoryContent = styled.div`
  text-align: center;
  padding: 0 20px;
`;

export const CategoryImageBg = styled.div`
  width: 65px;
  height: 65px;
  background-color: ${({ theme }) => theme.color.mainDark};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #fff;
  }
`;
export const CategoryImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

export const CategoryName = styled.div`
  padding-top: 10px;
`;
