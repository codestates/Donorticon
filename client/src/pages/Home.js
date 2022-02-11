import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, logout, userSelector } from '../redux/user/userSlice';

const Container = styled.div`
  color: ${(props) => props.theme.color.main};
  // color: ${({ theme }) => theme.color.main};
  font-size: 30px;
`;

const Button = styled.div`
  width: 10%;
  border-bottom: 1px solid black;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const Home = () => {
  const isLoggedIn = useSelector(userSelector);
  const dispatch = useDispatch();
  console.log(isLoggedIn);
  const handleSignIn = () => {
    dispatch(login());
  };
  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <Container>
      <Button onClick={handleSignIn}>로그인</Button>
      <Button onClick={handleSignOut}>로그아웃</Button>
    </Container>
  );
};

export default Home;
