import styled from 'styled-components';

export const SlideBox = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 300px;
    margin: 0;
    margin-top: 50px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin: 20px 0;
  }
  img {
    width: 200px;
    height: 200px;
    padding: 5px;
    :nth-of-type(2n) {
      animation: ${(props) =>
        props.isReady && 'fadeIn 5s ease-in-out infinite'};
    }
    :nth-of-type(2n-1) {
      animation: ${(props) =>
        props.isReady && 'fadeOut 5s ease-in-out infinite'};
    }
    @media ${({ theme }) => theme.device.tablet} {
      width: 150px;
      height: 150px;
      :nth-of-type(2n) {
        animation: none;
      }
      :nth-of-type(2n-1) {
        animation: none;
      }
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opactiy: 0.5;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opactiy: 1;
    }
  }
`;
