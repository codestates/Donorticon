import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Button = styled.div`
  width: 10%;
  border-bottom: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    color: black;
  }
`;

const VerifyRedir = ({ userInfo }) => {
  const [verification, setVerification] = useState(false);
  const headers = {
    type: `${userInfo.params.type}`,
    id: `${userInfo.params.type}`,
    code: `${userInfo.params.code}`
  }

  useEffect( async () => {
    const request = await axios.put(`${process.env.REACT_APP_SERVER}/verification`, {headers: headers});
    if (request.verification === true) setVerification(true);
  },[])

  return (
    <div>
      <div><img src={`${process.env.REACT_APP_BUCKET}/aintgottime.jpg`}></img></div>
      {verification ? <Button>Verified! Please Sign in again</Button> : <Button>Checking.....</Button>}
    </div>
  );
};

export default VerifyRedir;