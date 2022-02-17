import styled from 'styled-components';
const Container = styled.div`
  height: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #eeeeee;
  border-radius: 10px;
`;

const Progress = styled.div`
  background-color: ${(props) => props.theme.color.main};
  width: ${(props) => props.width};
  height: 100%;
  transition: width 1s;
  border-radius: 20px;
  text-align: center;
`;

const ProgressBar = ({ percent }) => {
  return (
    <Container>
      <Progress width={`${percent}%`}>{percent}%</Progress>
    </Container>
  );
};

export default ProgressBar;
