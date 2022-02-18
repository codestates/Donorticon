import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socialSignIn, setSocialUser } from '../../redux/user/userSlice';

const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getGoogleCode = () => {
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
      } = await axios.post('/google/signin', {
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
      } = await axios.get(`/google/user?accessToken=${token}`);

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

  useEffect(() => getGoogleCode(), []);

  return <></>;
};

export default Google;
