import styled from 'styled-components';
import { Button } from '../utils/Button';
import { Container } from '../utils/Container';

export const VeriContainer = styled(Container)`
  min-height: 800px;
`;

export const WelcomeText = styled.div`
  font-size: ${(props) => (props.small ? '20px' : '25px')};
  line-height: ${(props) => (props.small ? '3' : '5')};
  padding-bottom: ${(props) => props.small && '40px'};
`;

export const WelcomeDescription = styled.div`
  line-height: 2;
`;

export const VeriButton = styled(Button)`
  width: 200px;
  margin-top: 40px;
`;
