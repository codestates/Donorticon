import { useState, useEffect } from 'react';
import { LandingContainer, TextBox } from '../../styles/Landing/CommonStyle';
import {
  ContentBox,
  Counter,
  Img,
  CounterBox,
  TopText,
  BottomText,
  Text,
  CountNum,
} from '../../styles/Landing/NumberStyle';
import heart from '../../img/landing4.png';

const HEART = heart;

const Number = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = document.body.scrollHeight;
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <LandingContainer bg>
      <TextBox last>
        Giver들과 함께 만들어간 <br />
        Donorticon의 "사회적 가치" 실현 현황
      </TextBox>
      <ContentBox>
        <Img src={HEART} />
        <Text>기부 프로젝트에 동참된 기프티콘</Text>
        <CounterBox>
          <TopText>
            {(maxScroll * 3) / 5 < scrollPosition && <Counter />}
            <CountNum>350</CountNum>
          </TopText>
          <BottomText bottom>개</BottomText>
        </CounterBox>
      </ContentBox>
    </LandingContainer>
  );
};

export default Number;
