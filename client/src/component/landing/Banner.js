import ilu2 from '../../img/ilu2.jpg'
import { BannerContainer, Img, TextContainer, Title, Text } from '../../styles/LandingStyle';

const Banner = () => {
  return (
    <BannerContainer>
      <Img src={ilu2}></Img>
      <TextContainer>
        <Title>Donate + Gifticon = Donorticon</Title>
        <br></br>
        <Text>
          <div>Donate your gifticons</div>
          <div>and support social vulnerables</div>
        </Text>
      </TextContainer>
    </BannerContainer>
  );
};

export default Banner;
