import ilu4 from '../../img/ilu4.jpg';
import ilu5 from '../../img/ilu5.jpg';
import ilu6 from '../../img/ilu6.jpg';
import ilu7 from '../../img/ilu7.jpg';
<<<<<<< HEAD
import {
  Container,
  Bullet,
  Img,
  Text,
  TextWrapper,
  Title,
  Wrapper,
  Slide,
  BulletWrapper,
} from '../../styles/Landing/HowToUseStyle';

const HowToUse = () => {
  // const swiper = new swiper();
  const list = [
    {
      img: ilu4,
      title: 'Step 01',
      text: 'Select a Helper',
    },
    {
      img: ilu5,
      title: 'Step 02',
      text: 'Choose a Gifticon',
    },
    {
      img: ilu6,
      title: 'Step 03',
      text: 'Send a Gifticon',
    },
    {
      img: ilu7,
      title: 'Step 04',
      text: 'Leave a message!',
    },
  ];

  return (
    <Container>
      {list.map((item, index) => (
=======
import { Container, Bullet, Img, Text, TextWrapper, Title, Wrapper, Slide, BulletWrapper } from '../../styles/landing/HowToUseStyle';

const HowToUse = () => {

  // const swiper = new swiper();
  const list = [
    {
    img: ilu4,
    title: 'Step 01',
    text: 'Select a Helper'
    },
    {
    img: ilu5,
    title: 'Step 02',
    text: 'Choose a Gifticon'
    },
    {
    img: ilu6,
    title: 'Step 03',
    text: 'Send a Gifticon'
    },
    {
    img: ilu7,
    title: 'Step 04',
    text: 'Leave a message!'
    },
  ]

  return (
    <Container>
    {list.map((item, index) => (
>>>>>>> feature/errorfix-5
        <Slide key={index}>
          <Wrapper>
            <Img src={item.img}></Img>
            <TextWrapper>
<<<<<<< HEAD
              <Title>{item.title}</Title>
              <Text>{item.text}</Text>
            </TextWrapper>
            <BulletWrapper>
              {list.map((item, index) => (
                <Bullet key={index} />
              ))}
            </BulletWrapper>
          </Wrapper>
        </Slide>
      ))}
=======
            <Title>
              {item.title}
             </Title>
            <Text>
              {item.text}
            </Text>
          </TextWrapper>
          <BulletWrapper>
          {list.map((item, index) => (
            <Bullet key={index}/>
          ))}
          </BulletWrapper>
        </Wrapper>
        </Slide>
    ))}
>>>>>>> feature/errorfix-5
    </Container>
  );
};

export default HowToUse;
