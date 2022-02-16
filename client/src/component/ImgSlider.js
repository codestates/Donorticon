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
import { useState } from 'react';

const ImgSlider = ({ data }) => {
  const list = data;
  const [imageIdx, SetImageIdx] = useState(0);
  const moveLeft = () => {
    if (imageIdx === 0) {
      SetImageIdx(list.length-1);  
    } else {
      SetImageIdx(imageIdx - 1);
    }
  };
  const moveRight = () => {
    if (imageIdx === list.length-1) {
      SetImageIdx(0);  
    } else {
      SetImageIdx(imageIdx + 1);
    }
  };
  const changeImg = (e) => {
    SetImageIdx(e);  
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
                  onClick={()=>changeImg(index)}
                ></Thumbnail>
              ) : (
                <Thumbnail src={thum} key={index} onClick={()=>changeImg(index)}></Thumbnail>
              ),
            )}
          </ThumbnailWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ImgSlider;
