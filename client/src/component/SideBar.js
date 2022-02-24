import { useSelector } from 'react-redux';
import { Item, SideBarContainer, StyledLink } from '../styles/SideBarStyle';

const MyPageSideBar = () => {
  const who = useSelector((state) => state.user.user.who);
  return (
    <SideBarContainer>
      <StyledLink to="/mypage">
        <Item first>내프로필</Item>
      </StyledLink>
      <StyledLink to="/gifticon?page=1&limit=9">
        <Item>{who === 1 ? '기부받은내역' : '기부내역'}</Item>
      </StyledLink>
    </SideBarContainer>
  );
};

export default MyPageSideBar;
