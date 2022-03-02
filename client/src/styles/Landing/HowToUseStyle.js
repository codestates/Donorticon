import styled from 'styled-components';

export const TextBox = styled.div`
  text-align: center;
  line-height: 1.5;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 100px;
`;

export const SlideBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Slide = styled.div`
  width: 20%;
  border: 1px solid #000;
  padding: 20px;
`;

export const Img = styled.img`
  width: 100%;
  animation: fadein 1s ease-in-out;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
`;

export const TextWrapper = styled.div``;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: #fff;
  margin: 20px 0;
  animation: fadein 1s ease-in-out;
  text-shadow: -1px 0 #000, 0 1px #000, 2px 0 #000, 0 -1px #000;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
`;

export const Text = styled.div`
  font-size: 25px;
  line-height: 1.5;

  animation: fadein 1.3s ease-in-out;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
`;

export const Bullet = styled.div`
  width: 11px;
  height: 11px;
  display: block;
  border-radius: 10px;
  background: #062744;
  opacity: 0.2;
  transition: all 0.3s;
  &-active {
    opacity: 1;
    background: #fd3838;
    height: 30px;
  }
  box-shadow: 0px 0px 20px rgba(252, 56, 56, 0.3);
`;

export const BulletWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
