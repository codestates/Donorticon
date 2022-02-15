import styled from 'styled-components';

export const Container = styled.div`
  padding: 20rem 0;
  display:flex;
  background-color: #FFE53B;
  background-image: linear-gradient(180deg, #1793cb 0%, #fac711 30%, pink 100%);
`;

export const Slide = styled.div`
  width: 60%auto;
  margin: auto;
`;

export const Wrapper = styled.li`
  width: 100%auto;
  align-items: center;
  background-color: white;
  list-style-type: none;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  justify-content: center;
  border-radius: 30px;
`;

export const Img = styled.img`
  border-radius: 30px;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, .2);
  animation: fadein 1s ease-in-out;
  @keyframes fadein{
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

export const TextWrapper = styled.div`
  border-radius: 30px;
`;

export const Title = styled.div`
  border-radius: 30px;
  font-size: 3rem;
  font-weight: 500;
  color: white;
  animation: fadein 1s ease-in-out;
  text-shadow: -1px 0 black, 0 1px black, 2px 0 black, 0 -1px black;
  @keyframes fadein{
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
  border-radius: 30px;
  margin-top: 3rem;
  font-size: 2rem;
  font-weight: 300;
  animation: fadein 1.3s ease-in-out;
  @keyframes fadein{
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
  transition: all .3s;
  &-active {
  opacity: 1;
  background: #fd3838;
  height: 30px;}
  box-shadow: 0px 0px 20px rgba(252, 56, 56, 0.3);
`;

export const BulletWrapper = styled.div`
  display: flex;
  flex-direction: column; 
`;