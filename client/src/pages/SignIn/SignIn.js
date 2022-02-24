import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import sha256 from 'js-sha256';
import { setUser, setWho, signIn } from '../../redux/user/userSlice';
import InputSet from '../../component/InputComponent';
import { ButtonContainer, SignInContainer } from '../../styles/SignInStyle';
import {
  Container,
  SubContainer,
  SubTitle,
  Title,
} from '../../styles/utils/Container';
import { Button } from '../../styles/utils/Button';
import { InputContainer, ErrorMessage } from '../../styles/utils/Input';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prev } = useSelector((state) => state.page);
  const who = useSelector((state) => state.user.user.who);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = (e) => {
    setUserInfo(
      Object.assign(userInfo, {
        [e.target.name]:
          e.target.name === 'password'
            ? sha256(e.target.value)
            : e.target.value,
      }),
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignin();
    }
  };

  const handleSignin = async () => {
    if (userInfo.email !== '' && userInfo.password !== '') {
      const whoIs = who === 1 ? 'giver' : 'helper';

      try {
        const {
          data: { info, accessToken },
        } = await axios.post(`/signin/${whoIs}`, userInfo);
        if (accessToken && info) {
          const { id, email, name, user_type: who } = info;
          dispatch(signIn());
          dispatch(setUser({ id, email, name, who }));
          localStorage.setItem('token', accessToken);
          if (whoIs === 'helper') {
            navigate('/mypage');
          } else {
            if (prev.includes('verifyRedir')) {
              navigate('/helperlist');
            } else {
              navigate(prev);
            }
          }
        }
      } catch (e) {
        if (e.response.status === 401) {
          navigate('/verification');
        }
        if (e.response.status === 404) {
          setErrorMessage('이메일 및 비밀번호를 잘못 입력했습니다');
        }
      }
    } else {
      // console.log('inficient params');
      const form = new RegExp(
        '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
      );
      if (userInfo.email === '') {
        setErrorMessage('이메일을 입력해주세요');
      } else if (!form.test(userInfo.email)) {
        setErrorMessage('이메일 형식을 확인하세요');
      } else {
        setErrorMessage('비밀번호를 입력하세요');
      }
    }
  };

  const handleGuest = async () => {
    if (who === 1) {
      try {
        dispatch(setWho(1));
        const {
          data: { accessToken: token },
        } = await axios.post('/signin/guest/giver');
        localStorage.setItem('token', token);
        dispatch(signIn());
        navigate(prev);
      } catch (e) {
        console.log(e);
      }
    } else if (who === 2) {
      try {
        dispatch(setWho(2));
        const {
          data: { accessToken: token },
        } = await axios.post('/signin/guest/helper');
        localStorage.setItem('token', token);
        dispatch(signIn());
        navigate('/mypage');
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleGoogle = () => {
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
    window.location.assign(GOOGLE_LOGIN_URL);
  };

  const handleKakao = () => {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(KAKAO_LOGIN_URL);
  };

  return (
    <Container>
      <SignInContainer>
        <SubContainer>
          <Title>{who === 1 ? 'GIVER' : 'HELPER'}</Title>
          <SubTitle>로그인</SubTitle>
        </SubContainer>
        <InputContainer>
          <InputSet
            title="이메일"
            name="email"
            inputPlaceHolder="이메일"
            callback={handleInput}
          />
          <InputSet
            title="비밀번호"
            name="password"
            inputPlaceHolder="비밀번호"
            callback={handleInput}
            handleKeyPress={handleKeyPress}
          />
          <ErrorMessage center>{errorMessage}</ErrorMessage>
        </InputContainer>
        <ButtonContainer>
          <Button onClick={handleSignin}>로그인</Button>
          <Button onClick={handleGuest}>게스트로그인</Button>
          {who === 1 ? (
            <>
              <Button onClick={handleGoogle}>구글로그인</Button>
              <Button onClick={handleKakao}>카카오로그인</Button>
            </>
          ) : null}
        </ButtonContainer>
      </SignInContainer>
    </Container>
  );
};

export default SignIn;
