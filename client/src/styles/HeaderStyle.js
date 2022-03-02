import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background-color: #fff;
  height: 75px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
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
  padding-left: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80px;
    height: 41px;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export const MobileNavContainer = styled.div`
  display: none;
  position: relative;

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

export const MobileNav = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    padding-right: 20px;
    width: 100%;
  }
`;

export const ListContainer = styled.ul`
  list-style: none;
  display: flex;

  @media ${({ theme }) => theme.device.mobile} {
    display: ${(props) => (props.isToggled ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 75px;
    transition: 0.5s all;
    margin: 0;
    background-color: #fff;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin: 20px 0;
    width: 100%;
  }
`;
