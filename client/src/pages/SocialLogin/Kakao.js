import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSocialUser, socialSignIn } from '../../redux/user/userSlice';

const KaKao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getKakaoCode = () => {
    const authorizationCode = new URL(window.location.href).searchParams.get(
      'code',
    );
    if (authorizationCode) {
      getToken(authorizationCode);
    }
  };

  const getToken = async (code) => {
    try {
      const {
        data: { token },
      } = await axios.post('/kakao/signin', {
        code,
      });
      getUserInfo(token);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const {
        data: { giverInfo, accessToken },
      } = await axios.get(`/kakao/user?accessToken=${token}`);

      if (giverInfo) {
        const { email, name, user_type: who } = giverInfo;
        dispatch(socialSignIn());
        dispatch(setSocialUser({ email, name, who }));
        localStorage.setItem('token', accessToken);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => getKakaoCode(), []);

  return <></>;
};

export default KaKao;
