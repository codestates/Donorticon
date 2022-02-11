import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, logout, userSelector } from '../redux/user/userSlice';

// 아래 styled 먹인 것들은 추후 수정예정
// 임시로 기능 확인 위해서 설정해 놓은 것
const Container = styled.div`
  color: ${(props) => props.theme.color.main};
  // color: ${({ theme }) => theme.color.main};
`;

const Button = styled.div`
  width: 10%;
  border-bottom: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    color: black;
  }
`;

const Text = styled.div`
  color: black;
  font-size: 15px;
  padding-top: 50px;
`;

const Home = () => {
  const { isLoggedIn } = useSelector(userSelector);
  const dispatch = useDispatch();
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
      <Text>{isLoggedIn ? '로그인상태입니다' : '로그아웃상태입니다'}</Text>
    </Container>
  );
};

export default Home;
