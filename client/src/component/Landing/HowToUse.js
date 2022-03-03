import { useEffect, useState } from 'react';
import {
  Img,
  Text,
  Card,
  BottomBox,
  ImgBox,
  CardTitle,
  CardContent,
} from '../../styles/Landing/HowToUseStyle';
import { LandingContainer, TextBox } from '../../styles/Landing/CommonStyle';
import one from '../../img/howIcons/step1.png';
import two from '../../img/howIcons/step2.png';
import three from '../../img/howIcons/step3.png';
import four from '../../img/howIcons/step4.png';

const list = [
  {
    img: one,
    title: 'STEP 1',
    text: 'Helper를 선택한다',
  },
  {
    img: two,
    title: 'STEP 2',
    text: '기프티콘을 준비한다',
  },
  {
    img: three,
    title: 'STEP 3',
    text: '기프티콘을 기부한다',
  },
  {
    img: four,
    title: 'STEP 4',
    text: '메세지를 주고 받는다',
  },
];

const HowToUse = () => {
  const [isReady, SetIsReady] = useState(false);
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position >= 550) {
      SetIsReady(true);
    } else {
      SetIsReady(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <LandingContainer bg>
      <TextBox>
        기프티콘으로 간단하게 <br />
        그리고 원하는 곳에 기부하세요!
      </TextBox>
      <BottomBox>
        {list.map((item, index) => (
          <Card key={index}>
            <CardTitle>{item.title}</CardTitle>
            <CardContent>
              <ImgBox>
                <Img src={item.img} isReady={isReady}></Img>
              </ImgBox>
              <Text>{item.text}</Text>
            </CardContent>
          </Card>
        ))}
      </BottomBox>
    </LandingContainer>
  );
};

export default HowToUse;
