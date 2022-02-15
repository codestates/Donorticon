import styled from 'styled-components';

export const BannerContainer = styled.div`
  height: 50rem;
  width: 100%;
  display:flex;
  background-color: #1793cb;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

export const Img = styled.img`
  width: 40%;
  align-items: center;
  justify-content: space-between;
  animation: fadein 3s ease-in-out;
  @keyframes fadein{
    0% {
    opacity: 0;
    transform: translateY(20px);
    }
    100% {
    opacity: 1;
    transform: none;
    }
  }
`;

export const TextContainer = styled.div`
  width: 100%;
  color: white;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  animation: fadein 3s ease-in-out;
  @keyframes fadein{
    0% {
    opacity: 0;
    transform: translateY(20px);
    }
    100% {
    opacity: 1;
    transform: none;
    }
  }
`;

export const Title = styled.div`
  font-size: 4rem;
  font-weight: 500;
`;

export const Text = styled.div`
  font-size: 2rem;
  font-weight: 200;
`;