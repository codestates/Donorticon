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
  padding: 40px;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
    padding: 20px;
  }
`;

export const Title = styled.div``;

export const SubTitle = styled.div``;

export const MesaageTitle = styled.div``;

export const MessageArea = styled.textarea``;
