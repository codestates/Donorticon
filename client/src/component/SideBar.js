import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Item, SideBarContainer, StyledLink } from '../styles/SideBarStyle';

const MyPageSideBar = () => {
  const who = useSelector((state) => state.user.user.who);
  const [myPageButton, setMyPageButton] = useState(false);
  const [gifticonButton, setGificonButton] = useState(false);

  const handleButtonActive = () => {
    const url = window.location.href;
    if (url.includes('mypage')) {
      setMyPageButton(true);
      setGificonButton(false);
    }
    if (url.includes('gifticon')) {
      setGificonButton(true);
      setMyPageButton(false);
    }
  };

  useEffect(() => handleButtonActive());
  return (
    <SideBarContainer>
      <StyledLink to="/mypage">
        <Item first className={`${myPageButton && 'active'}`}>
          내프로필
        </Item>
      </StyledLink>
      <StyledLink to="/gifticon?page=1&limit=9">
        <Item className={`${gifticonButton && 'active'}`} n>
          {who === 1 ? '기부내역' : '기부받은내역'}
        </Item>
      </StyledLink>
    </SideBarContainer>
  );
};

export default MyPageSideBar;
