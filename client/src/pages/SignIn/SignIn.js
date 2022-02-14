import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { sha256 } from 'js-sha256';
import {
  login,
  setEmail,
  setPassword,
  userSelector,
} from '../../redux/user/userSlice';

const LoginContainer = styled.div`
  color: ${(props) => props.theme.color.main};
  // color: ${({ theme }) => theme.color.main};
`;

const LoginInput = styled.input``;

const LoginButton = styled.button`
  border: 1px;
  border-style: solid;
  border-color: black;
  cursor: pointer;
  margin-left: 10px;
`;

const SignIn = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(userSelector);
  console.log(state);

  const handleEmail = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePassword = (e) => {
    const convertedPassword = sha256(e.target.value);
    dispatch(setPassword(convertedPassword));
  };

  const handleLogin = async () => {
    try {
      // const result = await axios.post()
      dispatch(login());
      dispatch(setEmail(''));
      dispatch(setPassword(''));
      window.location.replace('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LoginContainer>
      <LoginInput
        type="text"
        placeholder="example@example.com"
        onChange={handleEmail}
      />
      <LoginInput
        type="password"
        placeholder="password"
        onChange={handlePassword}
      />
      <LoginButton onClick={handleLogin}>Login</LoginButton>
    </LoginContainer>
  );
};

export default SignIn;
