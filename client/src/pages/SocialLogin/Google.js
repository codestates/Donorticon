import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { socialSignIn, setSocialUser } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState();

  const getGoogleCode = () => {
    const googleCode = new URL(window.location.href).searchParams.get('code');
    if (googleCode) {
      getToken(googleCode);
    }
  };

  const getToken = async (code) => {
    try {
      const data = await axios.post('/google/signin', {
        code,
      });
      setToken(data.data.access_token);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const data = await axios.get(`/google/user?accessToken=${token}`);
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

  useEffect(() => getGoogleCode(), []);

  useEffect(() => getUserInfo(token), [token]);

  return (
    <>
      <div></div>
    </>
  );
};

export default Google;
