import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BannerContainer = styled.div`
  height: 50rem;
  width: 100%;
  display:flex;
  background-color: #1793cb;
  margin-top: -140px;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

export const Img = styled.img`
  width: 40%;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

export const TextContainer = styled.div`
  width: 100%;
  color: white;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

export const Title = styled.div`
  font-size: 4rem;
  font-weight: 500;
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
`;

export const Text = styled.div`
  font-size: 2rem;
  font-weight: 200;
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
`;