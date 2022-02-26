import { Button, StyledLink } from '../../styles/Landing/FloatingButtonStyle';

const FloatingButton = () => {
  return (
    <StyledLink to="/helperlist/category/0?page=1&limit=9">
      <Button>Go to Donate</Button>
    </StyledLink>
  );
};

export default FloatingButton;
