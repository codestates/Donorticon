import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { updateVerification } from '../../redux/user/userThunk';
import { useDispatch } from 'react-redux';

const Button = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    color: black;
  }
`;

const VerifyRedir = () => {
  const dispatch = useDispatch();
  const [verification, setVerification] = useState(false);
  const url = window.location.pathname.split('/');
  const type = url[2].split('=')[1];
  const id = url[3].split('=')[1];
  const code = url[4].split('=')[1];

  const info = {
    type: type,
    id: id,
    code: code,
  };

  useEffect(() => {
    // const request = await axios.put(`/verification`, { headers: headers });
    const verified = dispatch(updateVerification(info)).unwrap();
    if (verified) {
      setVerification(true);
    }
  }, []);

  return (
    <div>
      <div>
        <img src={`${process.env.REACT_APP_BUCKET}/aintgottime.jpg`}></img>
      </div>
      {verification ? (
        <Button>Verified! Please Sign in again</Button>
      ) : (
        <Button>Checking.....</Button>
      )}
    </div>
  );
};

export default VerifyRedir;
