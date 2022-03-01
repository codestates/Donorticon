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
  margin-top: ${(props) => props.noSpace && '0'};
`;

export const ModalFrame = styled.div`
  padding: ${(props) => (props.noSpace ? '50px' : '100px')};
  width: ${(props) => props.noSpace && '500px'};
  height: auto;
  background-color: #fff;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
    padding: 20px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 15px;
    font-weight: 500;
    line-height: initial;
  }
`;

export const SubTitle = styled.div`
  padding: 25px 0;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 13px;
  }
`;

export const MesaageTitle = styled.div`
  color: ${({ theme }) => theme.color.lightGrey};
  font-size: 12px;
  margin: 10px 0;
`;

export const MessageArea = styled.textarea`
  all: unset;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  padding: 10px;
  height: 100px;
  width: 85%;
  text-align: start;
`;

export const ButtonContainer = styled.div`
  width: 100%;
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
