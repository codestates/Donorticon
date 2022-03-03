import styled from 'styled-components';
import { Button } from '../utils/Button';

export const ButtonContainer = styled.div`
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const Btn = styled(Button)`
  width: 250px;
  letter-spacing: 1px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;
