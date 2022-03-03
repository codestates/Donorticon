import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonContainer = styled.div``;

export const Button = styled.button`
  z-index: 4;
  position: fixed;
  bottom: 10%;
  left: 20px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.main};
  font-weight: 500;
  text-align: center;
  padding: 20px;
  &:hover {
    box-shadow: 0 0 15px rgba(229, 185, 61);
    transition: 0.7s;
  }
  @media ${({ theme }) => theme.device.tablet} {
    bottom: 50%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    bottom: 5%;
  }
`;

export const StyledLink = styled(Link)`
  all: unset;
`;
