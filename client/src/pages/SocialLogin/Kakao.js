import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSocialUser, socialSignIn } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const KaKao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState();

  const getKakaoCode = () => {
    const kakaoCode = new URL(window.location.href).searchParams.get('code');
    if (kakaoCode) {
      getToken(kakaoCode);
    }
  };

  const getToken = async (code) => {
    try {
      const data = await axios.post('/kakao/signin', {
        code,
      });
      const accessToken = data.data.access_token;
      setToken(accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const data = await axios.get(`/kakao/user?accessToken=${token}`);
      if (data) {
        const { email, name, user_type: who } = data.data.giverInfo;
        dispatch(socialSignIn());
        dispatch(setSocialUser({ email, name, who }));
        localStorage.setItem('token', token);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => getKakaoCode(), []);

  useEffect(() => getUserInfo(token), [token]);

  return (
    <>
      <div></div>
    </>
  );
};

export default KaKao;
