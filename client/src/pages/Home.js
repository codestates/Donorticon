import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, logout, setWho, userSelector } from '../redux/user/userSlice';
import { setIsModalOpen, utilSelector } from '../redux/util/utilSlice';
import Modal from '../component/Modal';
import { Link } from 'react-router-dom';

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
  const userState = useSelector(userSelector);
  const dispatch = useDispatch();
  console.log(userState);
  const handleSignInButton = () => {
    if (userState.isLoggedIn) {
      // 로그아웃
      dispatch(logout());
    } else {
      // 로그인
      dispatch(setIsModalOpen());
    }
  };

  return (
    <Container>
      <Button onClick={handleSignInButton}>
        {userState.isLoggedIn ? '로그아웃' : '로그인'}
      </Button>
      {userState.isLoggedIn ? (
        <Link to="/mypage">
          <Button>마이페이지</Button>
        </Link>
      ) : (
        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
      )}
      <Modal
        content={'hi'}
        buttonList={['Giver', 'Helper']}
        nextPage={'/login'}
        callback={setWho}
      />
    </Container>
  );
};

export default Home;
