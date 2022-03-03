import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 350px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 150px;
  padding-bottom: 100px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding-top: 20px;
`;

export const SocialBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  margin-top: ${(props) => (props.kakao ? '20px' : '10px')};
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
