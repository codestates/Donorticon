import styled from 'styled-components';
import { Button } from './utils/Button';

export const ButtonContainer = styled.div`
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

export const Btn = styled(Button)`
  width: 250px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;
