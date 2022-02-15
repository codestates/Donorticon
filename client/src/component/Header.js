import { useState } from 'react';
import { useSelector } from 'react-redux';
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
import ButtonModal from './ButtonModal';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleSignInModal = () => {
    setIsOpen(true);
  };

  return (
    <HeaderContainer>
      <StyledLink to="/" onClick={handleToggle} style={{ paddingLeft: '20px' }}>
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
            <ListItem onClick={handleSignInModal}>로그인</ListItem>
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
          <ListItem onClick={handleSignInModal}>로그인</ListItem>
          <StyledLink to="/signup" onClick={handleToggle}>
            <ListItem>회원가입</ListItem>
          </StyledLink>
        </ListContainer>
      ) : null}
      {isOpen ? (
        <ButtonModal
          giverText={'giver 로그인'}
          helperText={'helper 로그인'}
          page={'signin'}
          setIsOpen={setIsOpen}
        />
      ) : null}
    </HeaderContainer>
  );
};

export default Header;
