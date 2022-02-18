import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled(false);
  };

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const handleSignInModal = () => {
    setIsSignInOpen(true);
  };

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const handleSignUpModal = () => {
    setIsSignUpOpen(true);
  };

  const handleSignOut = async () => {
    try {
      const result = await axios.post(`/signout`);
      if (result.status === 205) {
        localStorage.removeItem('token');
        dispatch(signOut());
        navigate('/');
      }
    } catch (e) {
      console.log(3);
    }
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
            <ListItem onClick={handleSignOut}>로그아웃</ListItem>
          </ListContainer>
        ) : (
          <ListContainer>
            <StyledLink to="/helperlist">
              <ListItem>기부하기</ListItem>
            </StyledLink>
            <ListItem onClick={handleSignInModal}>로그인</ListItem>
            <ListItem onClick={handleSignUpModal}>회원가입</ListItem>
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
      {isSignInOpen ? (
        <ButtonModal
          giverText={'GIVER 로그인'}
          helperText={'HELPER 로그인'}
          setIsSignInOpen={setIsSignInOpen}
        />
      ) : null}
      {isSignUpOpen ? (
        <ButtonModal
          giverText={'GIVER 회원가입'}
          helperText={'HELPER 회원가입'}
          setIsSignUpOpen={setIsSignUpOpen}
        />
      ) : null}
    </HeaderContainer>
  );
};

export default Header;
