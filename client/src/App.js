import styled from 'styled-components';

const TestDiv = styled.div`
  color: ${({ theme }) => theme.color.error};
  font-size: 50px;
`;

const TestButton = styled.button``;

const App = () => {
  return (
    <>
      <TestDiv>hello world</TestDiv>
      <TestButton>button</TestButton>
    </>
  );
};

export default App;
