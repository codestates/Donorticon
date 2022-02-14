import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: 75px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
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

export const Nav = styled.div`
  padding-right: 20px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    padding-right: 0;
    padding-bottom: 20px;
  }
`;

export const MobileNavContainer = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

export const MobileNav = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    padding-right: 20px;
    width: 100%;
  }
`;

export const MobileNavContent = styled.div`
  display: ${(props) => (props.isToggled ? 'flex' : 'none')};
  flex-direction: column;
  width: 100%;
`;
