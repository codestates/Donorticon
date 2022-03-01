import { Button, StyledLink } from '../../styles/Landing/FloatingButtonStyle';

const FloatingButton = () => {
  return (
    <StyledLink to="/helperlist/category/0?page=1&limit=9">
      <Button>기부하러 가보실까요?</Button>
    </StyledLink>
  );
};

export default FloatingButton;
