import styled from 'styled-components';
import { ButtonContainer, ModalButton } from './ModalStyle';

export const ImgUploadContainer = styled.div`
  padding: 50px;
  width: 500px;
  height: auto;
  text-align: center;
  background-color: white;
  z-index: 100;
`;

export const ImgWrapper = styled.div`
  height: 20rem;
  border: 1px dashed ${({ theme }) => theme.color.lightGrey};
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
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
  margin: 25px 0;
  > div {
    position: relative;
  }
`;

export const InputImg = styled.input`
  display: none;
`;

export const InputText = styled.input`
  width: 100%;
  height: 100px;
  padding: 25px;
  margin-top: 25px;
`;

export const ButtonWrapper = styled(ButtonContainer)`
  padding: 0;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 45%;
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
