import styled from 'styled-components';

export const LandingContainer = styled.div`
  border: 1px solid red;
  height: 100vh;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bg && props.theme.color.progressBar};
  @media ${({ theme }) => theme.device.mobile} {
    height: auto;
  }
`;

export const TextBox = styled.div`
  text-align: center;
  line-height: 1.5;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 100px;
  @media ${({ theme }) => theme.device.tablet} {
    margin-bottom: 0;
    font-size: 30px;
    margin-bottom: ${(props) => (props.last ? '50px' : '0')};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 22px;
    margin-top: 50px;
    margin-bottom: 0;
  }
`;
