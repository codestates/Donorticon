import styled from 'styled-components';
import { GifticonButton } from './GifticonDetailStyle';

export const ButtonBox = styled.div`
  width: 60%;
  display: flex;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const JustForStyle = styled.div`
  width: 30%;
  margin-right: 20px;
`;

export const GifticonUsedButton = styled(GifticonButton)`
  padding: 10px;
  width: 70%;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 10px;
  }
  &.disable {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const GifticonMessage = styled.textarea`
  all: unset;
  box-sizing: border-box;
  width: 40%;
  height: 100px;
  border: 1px solid #000;
  text-align: left;
  padding: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const PointImage = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: pointer;
`;
