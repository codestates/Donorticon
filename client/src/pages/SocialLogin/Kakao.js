import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, signIn } from '../../redux/user/userSlice';
import { setToken } from '../../redux/utils/auth';

const KaKao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prev } = useSelector((state) => state.page);

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
      } = await axios.get(`/kakao/user?accessToken=${token}`, {
        withCredentials: true,
      });

      if (giverInfo) {
        const { id, email, name, user_type: who } = giverInfo;
        dispatch(signIn());
        dispatch(setUser({ id, email, name, who }));
        setToken(accessToken);
        navigate(prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => getKakaoCode(), []);

  return <></>;
};

export default KaKao;
