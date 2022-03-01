import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonContainer = styled.div``;

export const Button = styled.button`
  z-index: 1000;
  position: fixed;
  bottom: 10%;
  right: 5%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.main};
  font-weight: 500;
  text-align: center;
  padding: 20px;
  &:hover {
    box-shadow: 0 0 15px rgba(229, 185, 61);
  }
`;

export const StyledLink = styled(Link)`
  all: unset;
`;
