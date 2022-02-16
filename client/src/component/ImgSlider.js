import {
  Container,
  Wrapper,
  Img,
  NextButton,
  PrevButton,
  ThumbnailWrapper,
  Thumbnail,
  Left,
  Right,
  ImgWrapper,
} from '../styles/ImgSliderStyle';
import ilu1 from '../img/ilu1.jpg';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useRef, useState } from 'react';

const ImgSlider = ({ data }) => {
  const list = [ilu1, ilu1, ilu1, ilu1];
  const [imageIdx, SetImageIdx] = useState(0);
  // const imageIdx = useRef(0);

  const moveLeft = () => {
    SetImageIdx(imageIdx - 1);
  };
  const moveRight = () => {
    SetImageIdx(imageIdx + 1);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <PrevButton>
            <FaAngleLeft size="20" onClick={moveLeft} />
          </PrevButton>
          <ImgWrapper>
            {list.map((item, index) => (
              <Img
                src={item}
                key={index}
                style={{ transform: `translateX(-${imageIdx * 100}%)` }}
              ></Img>
            ))}
          </ImgWrapper>
          <NextButton>
            <FaAngleRight size="20" onClick={moveRight} />
          </NextButton>
        </Left>
        <Right>
          <ThumbnailWrapper>
            {list.map((thum, index) =>
              index === imageIdx ? (
                <Thumbnail
                  src={thum}
                  key={index}
                  className="current"
                ></Thumbnail>
              ) : (
                <Thumbnail src={thum} key={index}></Thumbnail>
              ),
            )}
          </ThumbnailWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ImgSlider;
