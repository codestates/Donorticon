import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalFrame = styled.div`
  padding: 100px;
  background-color: #fff;
  text-align: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
    padding: 20px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const SubTitle = styled.div`
  padding: 25px 0;
`;

export const MesaageTitle = styled.div``;

export const MessageArea = styled.textarea``;

export const ButtonContainer = styled.div`
  padding-top: 25px;
  display: flex;
  justify-content: space-around;
`;

export const ModalButton = styled.button`
  width: 40%;
  border: 1px solid ${({ theme }) => theme.color.main};
  cursor: pointer;
  padding: 10px 0;
  &:hover {
    background-color: ${({ theme }) => theme.color.main};
    transition: 0.7s;
  }
`;
