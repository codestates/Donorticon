import { useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user/userSlice';
import {
  NavContainer,
  HeaderContainer,
  LogoContainer,
  StyledLink,
  MobileNavContainer,
  MobileNav,
  Nav,
  MobileNavContent,
} from '../styles/HeaderStyle';
import logo from '../img/logo.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const { isLoggedIn } = useSelector(userSelector);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <HeaderContainer>
        <StyledLink to="/">
          <LogoContainer src={logo} />
        </StyledLink>
        {/* 컴퓨터/태블릿 헤더 */}
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
        {/* 모바일 전용 헤더 */}
        <MobileNavContainer>
          <MobileNav onClick={() => setIsToggled(!isToggled)}>
            {isToggled ? (
              <AiOutlineClose size="20" />
            ) : (
              <AiOutlineMenu size="20" />
            )}
          </MobileNav>
        </MobileNavContainer>
      </HeaderContainer>
      <MobileNavContent isToggled={isToggled}>
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
      </MobileNavContent>
    </>
  );
};

export default Header;
