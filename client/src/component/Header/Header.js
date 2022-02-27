import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../redux/user/userSlice';
import {
  HeaderContainer,
  LogoContainer,
  StyledLink,
} from '../../styles/HeaderStyle';
import logo from '../../img/logo.png';
import ButtonModal from '../Modal/ButtonModal';
import MobileHeader from './MobileHeader';
import WebHeader from './WebHeader';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled(false);
  };

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const handleSignInModal = () => {
    setIsSignInOpen(true);
    setIsToggled(false);
  };

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const handleSignUpModal = () => {
    setIsSignUpOpen(true);
    setIsToggled(false);
  };

  const handleSignOut = async () => {
    try {
      const result = await axios.post(`/signout`);
      if (result.status === 205) {
        navigate('/');
        localStorage.removeItem('token');
        dispatch(signOut());
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeaderContainer>
      <StyledLink to="/" onClick={handleToggle} style={{ paddingLeft: '20px' }}>
        <LogoContainer src={logo} />
      </StyledLink>
      {/* 컴퓨터/태블릿 헤더 */}
      <WebHeader
        handleSignOut={handleSignOut}
        handleSignInModal={handleSignInModal}
        handleSignUpModal={handleSignUpModal}
      />
      {/* 모바일 전용 헤더 */}
      <MobileHeader
        isToggled={isToggled}
        setIsToggled={setIsToggled}
        handleToggle={handleToggle}
        handleSignInModal={handleSignInModal}
        handleSignUpModal={handleSignUpModal}
      />
      {isSignInOpen && (
        <ButtonModal
          giverText={'GIVER 로그인'}
          helperText={'HELPER 로그인'}
          setIsSignInOpen={setIsSignInOpen}
          isSignInOpen={isSignInOpen}
        />
      )}
      {isSignUpOpen && (
        <ButtonModal
          giverText={'GIVER 회원가입'}
          helperText={'HELPER 회원가입'}
          setIsSignUpOpen={setIsSignUpOpen}
          isSignUpOpen={isSignUpOpen}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
