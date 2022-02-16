import { Container, Wrapper, Img, NextButton, PrevButton, ThumbnailWrapper, Thumbnail, Left, Right, ImgWrapper } from "../styles/ImgSliderStyle";
import ilu1 from '../img/ilu1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from 'react';


const ImgSlider = ({ data }) => {
  const list = [ilu1, ilu1, ilu1, ilu1]
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
          <PrevButton><FontAwesomeIcon icon={faAngleLeft} size='1x' onClick={moveLeft}/></PrevButton>
          <ImgWrapper>{list.map((item, index) => <Img src={item} key={index} style={{ transform: `translateX(-${imageIdx * 100}%)`}}></Img>)}</ImgWrapper>
          <NextButton><FontAwesomeIcon icon={faAngleRight} size='1x' onClick={moveRight}/></NextButton>
        </Left>
        <Right>
          <ThumbnailWrapper>
            {list.map((thum, index) => index === imageIdx ? <Thumbnail src={thum} key={index} className='current'></Thumbnail> : <Thumbnail src={thum} key={index}></Thumbnail>)}
          </ThumbnailWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ImgSlider;
