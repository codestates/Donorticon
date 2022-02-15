import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

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
  const state = useSelector((state) => state.user);
  const headers = {
    email: `${state.email}`,
    type: `${state.type}`,
    id: `${state.id}`,
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
      <Button onClick={handleVerification}>Request a verification email</Button>
    </div>
  );
};

export default Verification;
