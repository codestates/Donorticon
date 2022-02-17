import styled from 'styled-components';

export const CardContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  @media ${({ theme }) => theme.device.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CardBox = styled.div`
  padding: 20px;
  width: 250px;
  height: 350px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
`;

export const CardGallery = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 1px solid #000;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const Img = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;
export const Name = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
export const Slogan = styled.div`
  text-align: left;
  font-size: 18px;
`;
