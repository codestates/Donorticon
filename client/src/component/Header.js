import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user/userSlice';
import {
  NavContainer,
  HeaderContainer,
  LogoContainer,
  StyledLink,
  Nav,
} from '../styles/HeaderStyle';
import logo from '../img/logo.png';

const Header = () => {
  const { isLoggedIn } = useSelector(userSelector);

  return (
    <HeaderContainer>
      <StyledLink to="/">
        <LogoContainer src={logo} />
      </StyledLink>
      <NavContainer>
        {isLoggedIn ? (
          <>
            <StyledLink to="/helperlist">
              <Nav>기부하기</Nav>
            </StyledLink>
            <StyledLink to="/dm">
              <Nav>메세지</Nav>
            </StyledLink>
            <StyledLink to="/mypage">
              <Nav>마이페이지</Nav>
            </StyledLink>
            <StyledLink to="/signout">
              <Nav>로그아웃</Nav>
            </StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/helperlist">
              <Nav>기부하기</Nav>
            </StyledLink>
            <StyledLink to="/signin">
              <Nav>로그인</Nav>
            </StyledLink>
            <StyledLink to="/signup">
              <Nav>회원가입</Nav>
            </StyledLink>
          </>
        )}
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
