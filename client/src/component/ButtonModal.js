import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPrev } from '../redux/page/pageSlice';
import { setWho } from '../redux/user/userSlice';
import { Btn, ButtonContainer } from '../styles/ButtonModalStyle';
import { ModalBackground, ModalFrame } from '../styles/utils/Modal';

const ButtonModal = ({
  giverText,
  helperText,
  setIsSignInOpen,
  setIsSignUpOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButton = (e) => {
    dispatch(setPrev(window.location.pathname));
    const text = e.target.innerText.split(' ');
    // 회원가입
    if (text[1] === '회원가입' && text[0] === 'GIVER') {
      setIsSignUpOpen(false);
      navigate('/signup/giver');
    } else if (text[1] === '회원가입' && text[0] === 'HELPER') {
      setIsSignUpOpen(false);
      navigate('/signup/helper');
    }
    // 로그인
    if (text[1] === '로그인' && text[0] === 'GIVER') {
      setIsSignInOpen(false);
      dispatch(setWho(1));
      navigate('/signin');
    } else if (text[1] === '로그인' && text[0] === 'HELPER') {
      setIsSignInOpen(false);
      dispatch(setWho(2));
      navigate('/signin');
    }
  };

  const handleModalClose = () => {
    if (setIsSignInOpen) {
      setIsSignInOpen(false);
    } else {
      setIsSignUpOpen(false);
    }
  };

  return (
    <ModalBackground onClick={handleModalClose}>
      <ModalFrame>
        <ButtonContainer>
          <Btn onClick={handleButton}>{giverText}</Btn>
          <Btn onClick={handleButton}>{helperText}</Btn>
        </ButtonContainer>
      </ModalFrame>
    </ModalBackground>
  );
};

export default ButtonModal;
