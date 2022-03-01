import styled from 'styled-components';

export const SliderContainer = styled.div`
  height: 600px;
  display: flex;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    height: 410px;
  }
`;

export const LeftBox = styled.div`
  width: 90%;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 300px;
  }
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
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const ThumbnailBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  .current {
    opacity: 1;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    flex-direction: row;
    padding-top: 10px;
    margin-left: 0;
  }
`;

export const Thumbnail = styled.img`
  height: 20%;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 20%;
    height: 100px;
  }
`;
