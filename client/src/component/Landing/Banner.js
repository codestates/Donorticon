import bannerimg from '../../img/banner.png';
import {
  BannerContainer,
  Bottom,
  BottomInner,
  ImageBox,
  TextBox,
  TitleInner,
  Top,
  TopInner,
} from '../../styles/Landing/BannerStyle';

const Banner = () => {
  return (
    <BannerContainer>
      <TextBox>
        <TitleInner>
          <Top>
            <TopInner>Donate + Gifticon</TopInner>
          </Top>
          <Bottom>
            <BottomInner>Donorticon</BottomInner>
          </Bottom>
        </TitleInner>
      </TextBox>
      <ImageBox>
        <img src={bannerimg} alt="banner" />
      </ImageBox>
      {/* <Text>
          <div>Donate your gifticons</div>
          <div>and support social vulnerables</div>
        </Text> */}
    </BannerContainer>
  );
};

export default Banner;
