import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, logout, userSelector } from '../redux/user/userSlice';
import axios from 'axios';

const Button = styled.div`
  width: 10%;
  border-bottom: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    color: black;
  }
`;

const Verification = () => {
  
  const handleVerification = async () => {
    const request = await axios.get(`${process.env.REACT_APP_SERVER}/verification`, {headers: {email: "swim1720@gmail.com"}});
    console.log(request);
  }

  return (
    <div>
      <div><img src={`${process.env.REACT_APP_BUCKET}/aintgottime.jpg`}></img></div>
      <Button onClick={handleVerification}>Request a verification email</Button>
    </div>
  );
};

export default Verification;