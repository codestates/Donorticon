import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: 75px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const StyledLink = styled(Link)`
  all: unset;
`;

export const LogoContainer = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  text-align: center;
  width: 100px;
  height: 52px;
  cursor: pointer;
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 30%;
`;

export const Nav = styled.div``;
