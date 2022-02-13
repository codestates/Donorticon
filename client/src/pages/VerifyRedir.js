import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, logout, userSelector } from '../redux/user/userSlice';
import axios from 'axios';
import { useEffect } from 'react';

const Button = styled.div`
  width: 10%;
  border-bottom: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    color: black;
  }
`;

const VerifyRedir = () => {

  let flag = false;

  useEffect( async () => {
    const request = await axios.put(`${process.env.REACT_APP_SERVER}/verification`, {headers: {email: "swim1720@gmail.com"}});
    return request;
  },[])

  return (
    <div>
      <div><img src={`${process.env.REACT_APP_BUCKET}/aintgottime.jpg`}></img></div>
      {flag ? <Button>Verified! Please Sign in again</Button> : <Button>Checking.....</Button>}
    </div>
  );
};

export default VerifyRedir;