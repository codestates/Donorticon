import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, logout, userSelector } from '../redux/user/userSlice';


const Verification = () => {
  
  return (
    <div>
      <div><img src={`${process.env.REACT_APP_BUCKET}/aintgottime.jpg`}></img></div>
    </div>
  );
};

export default Verification;
