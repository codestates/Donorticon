import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {
  SliderContainer,
  SelectedImg,
  NextButton,
  PrevButton,
  ThumbnailBox,
  Thumbnail,
  LeftBox,
  RightBox,
} from '../../styles/HelperDetail/ImageSliderStyle';

const ImageSlider = ({ data }) => {
  const list = data;
  const [imageIdx, SetImageIdx] = useState(0);
  const moveLeft = () => {
    if (imageIdx === 0) {
      SetImageIdx(list.length - 1);
    } else {
      SetImageIdx(imageIdx - 1);
    }
  };
  const moveRight = () => {
    if (imageIdx === list.length - 1) {
      SetImageIdx(0);
    } else {
      SetImageIdx(imageIdx + 1);
    }
  };
  const changeImg = (e) => {
    SetImageIdx(e);
  };

  return (
    <SliderContainer>
      <LeftBox>
        <PrevButton>
          <FaAngleLeft size="30" onClick={moveLeft} />
        </PrevButton>
        <SelectedImg src={list[imageIdx]}></SelectedImg>
        <NextButton>
          <FaAngleRight size="30" onClick={moveRight} />
        </NextButton>
      </LeftBox>
      <RightBox>
        <ThumbnailBox>
          {list.map((thum, index) =>
            index === imageIdx ? (
              <Thumbnail
                src={thum}
                key={index}
                className="current"
                onClick={() => changeImg(index)}
              ></Thumbnail>
            ) : (
              <Thumbnail
                src={thum}
                key={index}
                onClick={() => changeImg(index)}
              ></Thumbnail>
            ),
          )}
        </ThumbnailBox>
      </RightBox>
    </SliderContainer>
  );
};

export default ImageSlider;
