import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 350px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
    padding: 50px 0;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding-top: 20px;
`;

export const SocialBox = styled.div`
  width: 100%;
  cursor: pointer;
  margin: 10px 0;
  padding: 10px 0;
  border: 1px solid ${({ theme }) => theme.color.main};
  display: grid;
  grid-template-columns: 25% 50% 25%;
  div.middle {
    display: flex;
    flex-direction: row;
  }
`;

export const SocialIcon = styled.div`
  width: 20%;
`;

export const SocialText = styled.div`
  width: 80%;
`;
