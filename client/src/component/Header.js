import { useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user/userSlice';
import {
  NavContainer,
  HeaderContainer,
  LogoContainer,
  StyledLink,
  ListContainer,
  ListItem,
  MobileNavContainer,
  MobileNav,
} from '../styles/HeaderStyle';
import logo from '../img/logo.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const { isLoggedIn } = useSelector(userSelector);
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(false);
  };

  return (
    <HeaderContainer>
      <StyledLink to="/" onClick={handleToggle}>
        <LogoContainer src={logo} />
      </StyledLink>
      {/* 컴퓨터/태블릿 헤더 */}
      <NavContainer>
        {isLoggedIn ? (
          <ListContainer>
            <StyledLink to="/helperlist">
              <ListItem>기부하기</ListItem>
            </StyledLink>
            <StyledLink to="/dm">
              <ListItem>메세지</ListItem>
            </StyledLink>
            <StyledLink to="/mypage">
              <ListItem>마이페이지</ListItem>
            </StyledLink>
            <StyledLink to="/signout">
              <ListItem>로그아웃</ListItem>
            </StyledLink>
          </ListContainer>
        ) : (
          <ListContainer>
            <StyledLink to="/helperlist">
              <ListItem>기부하기</ListItem>
            </StyledLink>
            <StyledLink to="/signin">
              <ListItem>로그인</ListItem>
            </StyledLink>
            <StyledLink to="/signup">
              <ListItem>회원가입</ListItem>
            </StyledLink>
          </ListContainer>
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
      {isToggled && isLoggedIn ? (
        <ListContainer isToggled={isToggled}>
          <StyledLink to="/helperlist" onClick={handleToggle}>
            <ListItem>기부하기</ListItem>
          </StyledLink>
          <StyledLink to="/dm" onClick={handleToggle}>
            <ListItem>메세지</ListItem>
          </StyledLink>
          <StyledLink to="/mypage" onClick={handleToggle}>
            <ListItem>마이페이지</ListItem>
          </StyledLink>
          <StyledLink to="/signout" onClick={handleToggle}>
            <ListItem>로그아웃</ListItem>
          </StyledLink>
        </ListContainer>
      ) : null}
      {isToggled && !isLoggedIn ? (
        <ListContainer isToggled={isToggled}>
          <StyledLink to="/helperlist" onClick={handleToggle}>
            <ListItem>기부하기</ListItem>
          </StyledLink>
          <StyledLink to="/signin" onClick={handleToggle}>
            <ListItem>로그인</ListItem>
          </StyledLink>
          <StyledLink to="/signup" onClick={handleToggle}>
            <ListItem>회원가입</ListItem>
          </StyledLink>
        </ListContainer>
      ) : null}
    </HeaderContainer>
  );
};

export default Header;
