import { useSelector } from 'react-redux';
import {
  ListContainer,
  ListItem,
  NavContainer,
  StyledLink,
} from '../../styles/HeaderStyle';

const WebHeader = ({ handleSignOut, handleSignInModal, handleSignUpModal }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
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
  );
};

export default WebHeader;
