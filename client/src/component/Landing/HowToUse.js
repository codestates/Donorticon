import {
  HowContainer,
  Bullet,
  Img,
  Text,
  TextWrapper,
  Title,
  Wrapper,
  Slide,
  BulletWrapper,
  SlideBox,
} from '../../styles/Landing/HowToUseStyle';
import { LandingContainer, TextBox } from '../../styles/Landing/CommonStyle';
import one from '../../img/howIcons/step1.png';
import two from '../../img/howIcons/step2.png';
import three from '../../img/howIcons/step3.png';
import four from '../../img/howIcons/step4.png';

const HowToUse = () => {
  const list = [
    {
      img: one,
      title: '스텝 원',
      text: 'Helper를 선택한다',
    },
    {
      img: two,
      title: '스텝 투',
      text: '기프티콘을 준비한다',
    },
    {
      img: three,
      title: '스텝 3',
      text: '기프티콘을 기부한다',
    },
    {
      img: four,
      title: '스텝 4',
      text: '메세지를 주고 받는다',
    },
  ];

  return (
    <LandingContainer>
      <TextBox>
        기프티콘으로 간단하게 <br />
        그리고 원하는 곳에 기부하세요!
      </TextBox>
      <SlideBox>
        {list.map((item, index) => (
          <Slide key={index}>
            <Img src={item.img}></Img>
            <TextWrapper>
              <Title>{item.title}</Title>
              <Text>{item.text}</Text>
            </TextWrapper>
            {/* <BulletWrapper>
              {list.map((item, index) => (
                <Bullet key={index} />
              ))}
            </BulletWrapper> */}
          </Slide>
        ))}
      </SlideBox>
    </LandingContainer>
  );
};

export default HowToUse;
