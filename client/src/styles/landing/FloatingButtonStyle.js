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
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  all: unset;
`;