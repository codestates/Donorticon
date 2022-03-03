import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sha256 from 'js-sha256';
import InputSet from '../../component/InputComponent';
import { SignUpContainer } from '../../styles/SignUpStyle';
import {
  Container,
  SubContainer,
  SubTitle,
  Title,
} from '../../styles/utils/Container';
import { Button } from '../../styles/utils/Button';
import { InputBox, InputContainer, InputLabel } from '../../styles/utils/Input';
import { signUpGiver, verifyUser } from '../../redux/user/userThunk';
import { unwrapResult } from '@reduxjs/toolkit';
import Loader from '../../component/Loader';

const SignUpGiver = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCheckStart, setIsCheckStart] = useState(false);
  const [giverInfo, setGiverInfo] = useState({
    email: '',
    name: '',
    password: '',
    passwordCheck: '',
    mobile: '',
  });
  const [isValid, setIsValid] = useState([false, false, false, false, true]);
  const [errorMessage, setErrorMessage] = useState('');
  const [delay, setDelay] = useState(false);
  const input = [
    {
      title: '이메일',
      inputPlaceHolder: '이메일을 입력해주세요',
      callback: (e) => {
        setGiverInfo({ ...giverInfo, email: e.target.value });
        const form = new RegExp(
          '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
        );
        const validList = [...isValid];
        validList[0] = form.test(e.target.value) && e.target.value.length <= 50;
        setIsValid(validList);
        return !(form.test(e.target.value) && e.target.value.length <= 50);
      },
      errorMessage: '이메일 형식이 맞지 않습니다',
    },
    {
      title: '이름',
      inputPlaceHolder: '8자 이내로 입력해주세요',
      callback: (e) => {
        setGiverInfo({ ...giverInfo, name: e.target.value });
        const validList = [...isValid];
        validList[1] = e.target.value.length <= 8;
        setIsValid(validList);
        return !(e.target.value.length <= 8);
      },
      errorMessage: '8자 이상의 이름입니다',
    },
    {
      title: '비밀번호',
      inputPlaceHolder: '비밀번호를 입력해주세요',
      callback: (e) => {
        setGiverInfo({ ...giverInfo, password: sha256(e.target.value) });
        const validList = [...isValid];
        validList[2] =
          e.target.value.length >= 1 &&
          sha256(e.target.value) === giverInfo.passwordCheck;
        setIsValid(validList);
        return !(
          e.target.value.length >= 1 &&
          sha256(e.target.value) === giverInfo.passwordCheck
        );
      },
      errorMessage: '비밀번호를 확인해주세요',
    },
    {
      title: '비밀번호 확인',
      inputPlaceHolder: '비밀번호를 확인해주세요',
      callback: (e) => {
        setGiverInfo({ ...giverInfo, passwordCheck: sha256(e.target.value) });
        const validList = [...isValid];
        validList[3] = sha256(e.target.value) === giverInfo.password;
        if (validList[3] && !validList[2]) validList[2] = true;
        setIsValid(validList);
        return sha256(e.target.value) !== giverInfo.password;
      },
      errorMessage: '비밀번호가 일치하지 않습니다',
    },
    {
      title: '휴대전화',
      inputPlaceHolder: '010-0000-0000 형식으로 입력해주세요',
      callback: (e) => {
        setGiverInfo({ ...giverInfo, mobile: e.target.value });
        const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
        const validList = [...isValid];
        validList[4] = e.target.value ? form.test(e.target.value) : true;
        setIsValid(validList);
        return e.target.value ? !form.test(e.target.value) : false;
      },
      errorMessage: '전화번호 형식이 맞지 않습니다',
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUpButton();
    }
  };

  const handleSignUpButton = async () => {
    setIsCheckStart(isValid.includes(false));
    if (!isValid.includes(false)) {
      try {
        const resultAction = await dispatch(signUpGiver(giverInfo));
        const id = unwrapResult(resultAction);
        setDelay(true);
        const userInfo = {
          email: giverInfo.email,
          name: giverInfo.name,
          type: 1,
          id,
        };
        await dispatch(verifyUser(userInfo));
        setDelay(false);
        navigate('../../verification');
      } catch (e) {
        const status = e.response.status;
        if (status === 409) {
          setErrorMessage('이미 회원가입 된 이메일입니다');
        } else if (status === 500) {
          setErrorMessage('다시 시도해주세요');
        } else if (status === 422) {
          setErrorMessage('필수 정보(*)를 모두 입력해 주세요');
        }
      }
    }
  };

  return (
    <Container>
      {delay ? (
        <Loader />
      ) : (
        <SignUpContainer>
          <SubContainer>
            <Title>GIVER</Title>
            <SubTitle>회원가입</SubTitle>
          </SubContainer>
          <InputContainer>
            {input.map((card, idx) => (
              <InputBox key={idx}>
                <InputLabel>
                  {card.title === '휴대전화' ? card.title : `${card.title} *`}
                </InputLabel>
                <InputSet
                  title={card.title}
                  inputPlaceHolder={card.inputPlaceHolder}
                  callback={card.callback}
                  errorMessage={card.errorMessage}
                  check={isCheckStart}
                  handleKeyPress={handleKeyPress}
                />
              </InputBox>
            ))}
          </InputContainer>
          {errorMessage && <div>{errorMessage}</div>}
          <Button style={{ marginTop: '40px' }} onClick={handleSignUpButton}>
            회원 가입
          </Button>
        </SignUpContainer>
      )}
    </Container>
  );
};

export default SignUpGiver;
