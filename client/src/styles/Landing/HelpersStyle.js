import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 15rem;
  background-image: linear-gradient(180deg, pink 0%, white 20%);
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 5rem;
`;

export const Img = styled.img`
  padding: 5rem 0 0 5rem;
  width: 50%;
`;

export const Title = styled.div`
  padding: 0.1rem 0;
  font-size: 2rem;
  font-weight: 500;
`;

export const Text = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
  font-weight: 200;
  width: 80%;
`;

export const TextWrapper = styled.div`
  padding: 5rem 0 0 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
`;