import React, { useEffect, useState } from 'react';
import { sha256 } from 'js-sha256';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../styles/utils/Button';
import { Input } from '../../styles/utils/Input';
import axios from 'axios';
import { ErrorMessage } from '../../component/Input';
import { setWho, socialSignIn } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  SubTitle,
  ContentBox,
} from '../../styles/SignInStyle';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prev } = useSelector((state) => state.page);
  const who = useSelector((state) => state.user.user.who);
  /* state.user = {
    isLoggedIn: false,
    user: {
      email: '',
      name: '',
      who: '',
    },
  } */
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

  const handleSignin = async () => {
    if (userInfo.email !== '' && userInfo.password !== '') {
      try {
        const result = await axios.post(`/signin/${who}`, userInfo);
        const { accessToken } = result.data;
        dispatch(socialSignIn());
        localStorage.setItem('token', accessToken);
        if (who === 'helper') {
          navigate('/mypage');
        } else {
          navigate('/helperlist');
        }
      } catch (e) {
        switch (e.response.status) {
          case 401: navigate('/verification')
          case 404: {
            setErrorMessage('email 및 비밀번호를 잘못 입력했습니다');
          }
        }
      }
    } else {
      console.log('inficient params');
      const form = new RegExp(
        '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
      );
      if (userInfo.email === '') {
        setErrorMessage('email을 입력해주세요');
      } else if (!form.test(userInfo.email)) {
        setErrorMessage('email 형식을 확인하세요');
      } else {
        setErrorMessage('비밀번호를 입력하세요');
      }
    }
  };

  const handleGuest = async () => {
    if (who === 'giver') {
      try {
        dispatch(setWho('giver_guest'));
        const result = await axios.post('/guest/giver');
        const { token } = result.data;
        localStorage.setItem('token', token);
        dispatch(socialSignIn());
        navigate(prev);
      } catch (e) {
        console.log(e);
      }
    } else if (who === 'helper') {
      try {
        dispatch(setWho('helper_guest'));
        const result = await axios.post('/guest/helper');
        const { token } = result.data;
        localStorage.setItem('token', token);
        dispatch(socialSignIn());
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
      <Title>{who === 'giver' ? 'G I V E R' : 'H E L P E R'}</Title>
      <SubTitle>L O G I N</SubTitle>
      <ContentBox>
        <Input name="email" placeholder="이메일" onChange={handleInput} />
        <Input
          name="password"
          type={'password'}
          placeholder="비밀번호"
          onChange={handleInput}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button onClick={handleSignin}>로그인</Button>
        <Button onClick={handleGuest}>게스트로그인</Button>
        {who === 'giver' ? (
          <>
            <Button onClick={handleGoogle}>구글로그인</Button>
            <Button onClick={handleKakao}>카카오로그인</Button>
          </>
        ) : null}
      </ContentBox>
    </Container>
  );
};

export default SignIn;
