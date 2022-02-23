import styled from 'styled-components';

const BarContainer = styled.div`
  height: 5px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.progressBar};
`;

const Bar = styled.div`
  background-color: ${(props) => props.theme.color.main};
  width: ${(props) => props.width};
  height: 100%;
  transition: width 0.5s;
`;

const Text = styled.div`
  padding-top: 10px;
  font-size: 10px;
  text-align: center;
  color: ${({ theme }) => theme.color.main};
`;

const ProgressBar = ({ percent, point }) => {
  const text = point ? `${percent}점` : `${percent}%`;
  const percentage = point ? percent * 4 : percent;
  return (
    <>
      <BarContainer>
        <Bar width={`${percentage}%`} />
      </BarContainer>
      <Text>{text}</Text>
    </>
  );
};

export default ProgressBar;
