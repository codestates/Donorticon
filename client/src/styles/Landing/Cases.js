import styled from 'styled-components';

export const Container = styled.div`
  padding: 15rem 0;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Img = styled.img`
  display: inline-block; 
  position: relative; 
  width: 100px; 
  height: 100px; 
  overflow: hidden; 
  border-radius: 50%;
`;

export const Title = styled.div`
  padding: 3rem 0;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
`;

export const Text = styled.div`
  padding: 2rem 0;
  font-size: 1rem;
  font-weight: 200;
  text-align: center;
`;

export const TextWrapper = styled.div`
  margin: 2rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Counter = styled.div`
  @property --num {
  syntax: "<integer>";
  initial-value: 567;
  inherits: false;
  }

  animation: counter 5s ease-in-out;
  counter-reset: num var(--num);
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  padding: 2rem;

  &:after{
    content: counter(num);
  }

  @keyframes counter {
  0% {
    --num: 0;
  }
  100% {
    --num: 567;
  }
}`;