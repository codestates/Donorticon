import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignIn, setGoogleUser } from '../../redux/user/userSlice';

const Google = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [token, setToken] = useState();

  const getGoogleCode = () => {
    const googleCode = new URL(window.location.href).searchParams.get('code');
    if (googleCode) {
      getToken(googleCode);
    }
  };

  const getToken = async (code) => {
    try {
      const res = await axios.post('/google/signin', {
        code,
      });
      setToken(res.data.access_token);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const data = await axios.get(`/google/user?accessToken=${token}`);
      if (data) {
        const { email, name, user_type: who } = data.data.userInfo;
        // console.log(email, name, who);
        dispatch(googleSignIn());
        dispatch(setGoogleUser({ email, name, who }));
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
