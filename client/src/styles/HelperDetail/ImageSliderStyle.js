import styled from 'styled-components';

export const SliderContainer = styled.div`
  height: 600px;
  display: flex;
`;

export const LeftBox = styled.div`
  width: 90%;
  position: relative;
`;

export const SelectedImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const PrevButton = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

export const NextButton = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

export const RightBox = styled.div`
  width: 10%;
`;

export const ThumbnailBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  .current {
    opacity: 1;
  }
`;

export const Thumbnail = styled.img`
  height: 20%;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;
