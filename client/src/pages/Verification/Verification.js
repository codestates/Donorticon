import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../redux/user/userThunk';

const Button = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  color: grey;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    color: black;
  }
`;

const Verification = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.user);
  const userInfo = {
    email: state.email,
    type: state.who,
    id: state.id,
  };
  const handleVerification = () => {
    // const request = await axios.get(
    //   `${process.env.REACT_APP_SERVER}/verification`,
    //   { headers: headers },
    // );
    dispatch(verifyUser(userInfo));
  };

  return (
    <div>
      <div>
        <img src={`${process.env.REACT_APP_BUCKET}/aintgottime.jpg`}></img>
      </div>
      <div>Please go check your email</div>
      <div>
        If you haven't received your email you can request an email below
      </div>
      <Button onClick={handleVerification}>Request a verification email</Button>
    </div>
  );
};

export default Verification;
