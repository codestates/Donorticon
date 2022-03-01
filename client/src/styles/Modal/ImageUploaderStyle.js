import styled from 'styled-components';
import { ButtonContainer } from './ModalStyle';

export const ImgUploadContainer = styled.div`
  width: 500px;
  height: auto;
  text-align: center;
  background-color: white;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
  }
`;

export const ImgWrapper = styled.div`
  width: 80%;
  margin-top: 50px;
  padding: 25px 0;
  border: 1px dashed ${({ theme }) => theme.color.lightGrey};
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
    margin-top: 25px;
  }
`;

export const Img = styled.img`
  height: 100%;
`;

export const DragNDropWrapper = styled.div``;

export const DragNDropText = styled.p`
  margin: 20px 0;
`;

export const DragNDropLabel = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.color.lightGrey};
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

export const TxtWrapper = styled.div`
  width: 80%;
  margin: 50px 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
    margin: 20px 0;
  }
`;

export const InputImg = styled.input`
  display: none;
`;

export const Text = styled.textarea`
  all: unset;
  text-align: left;
  border: 1px solid #000;
  width: 90%;
  padding: 25px;
  margin-top: 25px;
  &:focus {
    outline: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px;
    margin-top: 25px;
  }
`;

export const ButtonWrapper = styled(ButtonContainer)`
  padding: 0;
  width: 90%;
  justify-content: space-around;
  margin-bottom: 50px;
`;

export const Button = styled.button`
  width: 40%;
  border: 1px solid ${({ theme }) => theme.color.main};
  cursor: pointer;
  padding: 10px 0;
  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
  &:hover:not(.disabled) {
    background-color: ${({ theme }) => theme.color.main};
    transition: 0.7s;
  }
`;
