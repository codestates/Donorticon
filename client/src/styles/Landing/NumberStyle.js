import styled from 'styled-components';
import { TextBox } from './CommonStyle';

export const NumberTextBox = styled(TextBox)`
  margin-bottom: 50px;
`;

export const ContentBox = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 250px;
    height: 250px;
    margin: 50px 0;
  }
`;

export const Img = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

export const Text = styled.div`
  font-size: 20px;
  margin-top: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 15px;
    margin-top: 10px;
  }
`;

export const CounterBox = styled.div`
  display: flex;
  margin-top: 20px;
  font-weight: 600;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 10px;
  }
`;

export const TopText = styled.div``;

export const BottomText = styled.div`
  font-size: 30px;
  position: absolute;
  bottom: 10px;
  right: -35px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
    right: -25px;
    bottom: 5px;
  }
`;

export const Counter = styled.div`
  @property --num {
    syntax: '<integer>';
    initial-value: 350;
    inherits: false;
  }
  color: ${({ theme }) => theme.color.main};
  font-size: 70px;
  animation: counter 5s ease-in-out;
  counter-reset: num var(--num);

  &:after {
    content: counter(num);
  }

  @keyframes counter {
    0% {
      --num: 0;
    }
    100% {
      --num: 350;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

export const CountNum = styled.div`
  display: none;
  color: ${({ theme }) => theme.color.main};
  font-size: 70px;

  @media ${({ theme }) => theme.device.tablet} {
    display: block;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 40px;
  }
`;
