import styled, { keyframes } from 'styled-components';

export const LoaderContainer = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Animate = keyframes`
    0% {
      transform: scale(0, 0);opacity:0;
    }
    100% {
      transform: scale(1, 1);opacity:1;
    }
`;

export const Box1 = styled(Box)`
  background: rgba(255, 206, 68, 0.6);
  animation: ${Animate} 0.6s ease-in-out infinite alternate;
`;

export const Box2 = styled(Box)`
  background: rgba(255, 206, 68, 0.4);
  animation: ${Animate} 1.4s ease-in-out infinite alternate;
`;

export const Box3 = styled(Box)`
  background: rgba(255, 206, 68, 0.3);
  animation: ${Animate} 0.7s ease-in-out infinite alternate;
`;

export const Box4 = styled(Box)`
  background: rgba(255, 206, 68, 0.5);
  animation: ${Animate} 1s ease-in-out infinite alternate;
`;
