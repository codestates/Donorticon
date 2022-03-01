import axios from 'axios';

export const getToken = async () => {
  const token = localStorage.getItem('token');
  try {
    await axios.get('/auth', { headers: { Authorization: `Bearer ${token}` } });
    return token;
  } catch (e) {
    if (e.response.status === 401) {
      try {
        const {
          data: { accessToken: token },
        } = await axios.put('/auth');
        setToken(token);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return localStorage.getItem('token');
};
export const removeToken = () => {
  localStorage.removeItem('token');
};
export const setToken = (token) => {
  localStorage.setItem('token', token);
};
