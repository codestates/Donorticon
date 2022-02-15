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

  return (
    <Container>
      <Title>Reviews</Title>
      <Wrapper>
        {list.map((item, index)=> (
        <TextWrapper key={index}>
          <Img src={item.img}></Img>
          <Text>{item.text}</Text>
          </TextWrapper>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Reviews;
