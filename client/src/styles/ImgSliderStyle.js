import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 15rem;
  text-align: center;
  font-size: 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Img = styled.img`
  width: 100%;
  z-index: 0; 
  transform: translateX(-0%);
  transition: transform 0.3s;
`;

export const PrevButton = styled.div`
  position:relative;
  left: 25px;
  opacity: 0.5;
  z-index: 1; 
  cursor: pointer;
  &:hover{
    opacity: 1;
  }
`;

export const NextButton = styled.div`
  position:relative;
  right: 25px;
  opacity: 0.5;
  z-index: 1; 
  cursor: pointer;
  &:hover{
    opacity: 1;
  }
`;

export const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .current {
    opacity: 1;
  }
`;

export const Thumbnail = styled.img`
  margin-bottom: 0.1rem;
  width: 8rem;
  height: 8rem;
  cursor: pointer;
  opacity: 0.5;
  &:hover{
    opacity: 1;
  }
`;

export const Left = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
`;

export const ImgWrapper = styled.div`
  display: flex;
  overflow:hidden;
`;