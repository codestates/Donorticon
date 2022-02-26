import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: #fac711;
  width: 15rem;
  height: 3rem;
  display: block;
  position: fixed;
  bottom: 15%;
  left: 80%;
  font-size: 1.7rem;
  font-weight: 300;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  justify-content: space-between;
  &:active{
    transform: translateY(4px);
    box-shadow: 8px 8px 2px 1px rgba(0, 0, 255, .2);
  }
`;

export const StyledLink = styled(Link)`
  all: unset;
`;