import { useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import {
  ListContainer,
  ListItem,
  MobileNav,
  MobileNavContainer,
  StyledLink,
} from '../../styles/HeaderStyle';

const MobileHeader = ({
  isToggled,
  setIsToggled,
  handleToggle,
  handleSignInModal,
  handleSignUpModal,
}) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <>
      <MobileNavContainer>
        <MobileNav onClick={() => setIsToggled(!isToggled)}>
          {isToggled ? (
            <AiOutlineClose size="20" />
          ) : (
            <AiOutlineMenu size="20" />
          )}
        </MobileNav>
      </MobileNavContainer>
      {isToggled && isLoggedIn && (
        <ListContainer isToggled={isToggled}>
          <StyledLink
            to="/helperlist/category/0?page=1&limit=9"
            onClick={handleToggle}
          >
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
      )}
      {isToggled && !isLoggedIn && (
        <ListContainer isToggled={isToggled}>
          <StyledLink
            to="/helperlist/category/0?page=1&limit=9"
            onClick={handleToggle}
          >
            <ListItem>기부하기</ListItem>
          </StyledLink>
          <ListItem onClick={handleSignInModal}>로그인</ListItem>
          <ListItem onClick={handleSignUpModal}>회원가입</ListItem>
        </ListContainer>
      )}
    </>
  );
};

export default MobileHeader;
