import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input } from '../../styles/utils/Input';
import { Button } from '../../styles/utils/Button';

const LoginContainer = styled.div`
  width: 350px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
  }
`;

const SignInBox = styled.div`
  width: 100%;
  margin-top: 0.8em;
`;

const ButtonBox = styled.div`
  margin-top: 0.4em;
`;

const SignIn = () => {
  return <>SIGNIN PAGE</>;
};

export default SignIn;
