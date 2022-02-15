import React, { useEffect, useState } from 'react';
import { sha256 } from 'js-sha256';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button } from '../../styles/utils/Button';
import { Input } from '../../styles/utils/Input';

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignIn = () => {
  const who = useSelector((state) => state.user.who);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    who,
  });

  const handleGoogle = () => {
    const googleScopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
    window.location.assign(GOOGLE_LOGIN_URL);
  };

  const handleKakao = () => {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(KAKAO_LOGIN_URL);
  };
  return (
    <Container>
      <div>이메일</div>
      <Input placeholder="이메일" />
      <div>비밀번호</div>
      <Input placeholder="비밀번호" />
      <Button>로그인</Button>
      <Button>게스트로그인</Button>
      {userInfo.who === 'giver' ? (
        <>
          <Button onClick={handleGoogle}>구글로그인</Button>
          <Button onClick={handleKakao}>카카오로그인</Button>
        </>
      ) : null}
    </Container>
  );
};

export default SignIn;
