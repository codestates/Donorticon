import axios from 'axios';

export const getToken = async () => {
  const token = localStorage.getItem('token');
  try {
    const {
      data: { rest },
    } = await axios.get('/auth', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (rest < 60 * 30) {
      const {
        data: { accessToken: newToken },
      } = await axios.put('/auth', null, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken(newToken);
    }
  } catch (e) {
    if (e.response.status === 401) {
      try {
        const {
          data: { accessToken: newToken },
        } = await axios.put('/auth', null, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setToken(newToken);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return token;
};
export const removeToken = () => {
  localStorage.removeItem('token');
};
export const setToken = (token) => {
  localStorage.setItem('token', token);
};
