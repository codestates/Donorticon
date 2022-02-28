import styled from 'styled-components';
import { Button } from './utils/Button';

export const SignInContainer = styled.div`
  width: 350px;
  padding: 100px 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
    padding: 50px 0;
  }
`;

export const ButtonContainer = styled.div`
  padding-top: 20px;
`;

export const SocialBox = styled.div`
  width: 100%;
  cursor: pointer;
  margin: 10px 0;
  padding: 10px 0;
  border: 1px solid ${({ theme }) => theme.color.main};

  display: grid;
  grid-template-columns: 33% 34% 33%;
  div.middle {
    display: flex;
    flex-direction: row;
  }
`;

export const SocialIcon = styled.div`
  padding-right: 10px;
  width: 30%;
`;
export const SocialText = styled.div`
  align-items: flex-end;
  width: 70%;
`;
