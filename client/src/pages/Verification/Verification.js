import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

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
  const state = useSelector((state) => state.user);
  const headers = {
    email: `${state.user.email}`,
    type: `${state.user.type}`,
    id: `${state.user.id}`,
  };
  const handleVerification = async () => {
    const request = await axios.get(
      `${process.env.REACT_APP_SERVER}/verification`,
      { headers: headers },
    );
  };

  return (
    <div>
      <div>
        <img src={`${process.env.REACT_APP_BUCKET}/aintgottime.jpg`}></img>
      </div>
      <div>Please go check your email</div>
      <div>If you haven't received your email you can request an email below</div>
      <Button onClick={handleVerification}>Request a verification email</Button>
    </div>
  );
};

export default Verification;
