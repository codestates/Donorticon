import styled from 'styled-components';
import { VscQuestion } from 'react-icons/vsc';

const Box = styled.div`
  position: relative;
  display: inline-block;
  span:hover + p.arrow_box {
    display: block;
  }
`;
const Text = styled.span`
  display: block;
  /* width: 80px; */
  /* padding: 2px 16px; */
  cursor: pointer;
`;

const Explanation = styled.p`
  display: none;
  position: absolute;
  width: 200px;
  padding: 8px;
  left: -90px;
  bottom: -270px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  background: #333;
  color: #fff;
  font-size: 14px;
  text-align: center;
  ::after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #333;
    border-width: 10px;
    pointer-events: none;
    content: ' ';
  }
`;

const Bubble = () => {
  return (
    <Box>
      <Text>
        <VscQuestion size="17" />
      </Text>
      <Explanation className="arrow_box">
        <br />
        연탄 온도는 연탄 포인트에 따라
        <br />
        <br />
        아래와 같이 레벨이 나뉘어요!
        <br />
        <br />
        ---------------------------
        <br />
        <br />
        브론즈 연탄 : 0점 ~ 5점
        <br />
        <br />
        실버 연탄 : 6점 ~ 10점
        <br />
        <br />
        골드 연탄 : 11점 ~ 15점
        <br />
        <br />
        플래티넘 연탄 : 16점 ~ 20점
        <br />
        <br />
        다이아몬드 연탄 : 21점 이상
        <br />
        <br />
      </Explanation>
    </Box>
  );
};

export default Bubble;
