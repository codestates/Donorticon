<<<<<<< HEAD
import {
  Container,
  Img,
  Text,
  TextWrapper,
  Title,
  Wrapper,
} from '../../styles/Landing/Reviews';
import reviewer from '../../img/reviewer.jpeg';

const Reviews = () => {
  const list = [
    {
      img: reviewer,
      text: 'I love it!',
    },
    {
      img: reviewer,
      text: 'Cooooool!',
    },
    {
      img: reviewer,
      text: 'Nezukoooo!',
    },
    {
      img: reviewer,
      text: 'Nice!',
    },
  ];
=======
import { Container, Img, Text, TextWrapper, Title, Wrapper } from "../../styles/landing/Reviews";
import reviewer from '../../img/reviewer.jpeg';

const Reviews = () => {

  const list = [{
    img: reviewer,
    text: 'I love it!'
  },
  {
    img: reviewer,
    text: 'Cooooool!'
  },
  {
    img: reviewer,
    text: 'Nezukoooo!'
  },
  {
    img: reviewer,
    text: 'Nice!'
  }
]
>>>>>>> feature/errorfix-5

  return (
    <Container>
      <Title>Reviews</Title>
      <Wrapper>
<<<<<<< HEAD
        {list.map((item, index) => (
          <TextWrapper key={index}>
            <Img src={item.img}></Img>
            <Text>{item.text}</Text>
=======
        {list.map((item, index)=> (
        <TextWrapper key={index}>
          <Img src={item.img}></Img>
          <Text>{item.text}</Text>
>>>>>>> feature/errorfix-5
          </TextWrapper>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Reviews;
