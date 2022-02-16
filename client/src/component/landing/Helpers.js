import { Container, Img, Text, TextWrapper, Title, Wrapper } from "../../styles/landing/HelpersStyle";
import ImgSlider from "../ImgSlider";
import ilu3 from '../../img/ilu3.jpg';
import ilu1 from '../../img/ilu1.jpg';

const Helpers = () => {
  const list = [ilu1, ilu1, ilu1, ilu1];

  return (
    <Container>
      <Wrapper>
        <Img src={ilu3}></Img>
        <TextWrapper>
          <Title>
           Lots of Helpers are 
          </Title>
          <Title>
            Helping peopel with Donorticon already
          </Title>
          <Text>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mi justo, efficitur et faucibus in, imperdiet ac risus. Donec suscipit arcu quis egestas pretium. Cras pretium iaculis eros, non ultricies libero facilisis ut. Praesent eros tortor, dapibus ut magna eget, maximus sollicitudin diam. Cras dignissim risus ac nibh pharetra, id venenatis odio sagittis.
          </Text>
        </TextWrapper>
        </Wrapper>
      <ImgSlider data={list}/>
    </Container>
  );
};

export default Helpers;
