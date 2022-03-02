import styled from 'styled-components';

export const TopBox = styled.div`
  text-align: center;
  line-height: 1.5;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 100px;
  @media ${({ theme }) => theme.device.tablet} {
    margin-bottom: 0;
    font-size: 30px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 25px;
    margin-top: 50px;
  }
`;

export const BottomBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media ${({ theme }) => theme.device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: 50px;
  }
`;

export const Card = styled.div`
  width: 25%;
  padding: 20px;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

export const CardTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.lightGrey};
  margin: 20px 0;
  animation: fadein 1s ease-in-out;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;

export const CardContent = styled.div`
  border-radius: 5%;
  background-color: #fff;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImgBox = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.color.main};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    width: 150px;
    height: 150px;
  }
`;

export const Img = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  animation: fadein 1s ease-in-out;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100px;
    height: 100px;
  }
`;

export const Text = styled.div`
  font-size: 25px;
  padding-top: 60px;
  animation: fadein 1.3s ease-in-out;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 22px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 20px;
  }
`;
