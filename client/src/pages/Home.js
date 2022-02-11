import styled from 'styled-components';

const Container = styled.div`
  color: ${(props) => props.theme.color.main};
  // color: ${({ theme }) => theme.color.main};
  font-size: 100px;
`;

const Home = () => {
  return <Container>HOME</Container>;
};

export default Home;
