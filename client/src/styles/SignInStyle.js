import styled from 'styled-components';

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
