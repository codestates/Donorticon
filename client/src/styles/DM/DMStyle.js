import styled from 'styled-components';


export const Container = styled.div`
  border: solid;
  border-color: grey;
  display: flex;
  font-size: 1rem;
  font-weight: 300;
  margin: 3rem;
`;

export const RoomContainer = styled.div`
  border: solid grey;
  width: 30%;
`;

export const ReceiverWrapper = styled.div`
  padding: 1rem;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: #fac711;
  }
  &.current {
    background-color: #fac711;
  }
`;

export const ReceiverImg = styled.img`
  border-radius: 70px;
  width: 40px;
  height: 40px;
`;

export const ReceiverName = styled.div`
  padding-left: 1rem;
`;

export const DialogueContainer = styled.div`
  border: solid grey;
  width: 100%;
`;

export const ProfileImg = styled.img``;

export const Message = styled.div`
  width: auto;
  border-radius: 30px;
  padding: 1rem;
  margin: 1rem;
  &.myMessage {
    background-color: #fac711;
  }
  &.yourMessage {
    background-color: #58D68D;
  }
`;

export const Image = styled.img`
  width: 20rem;
  border-radius: 30px;
  padding: 1rem;
  margin: 1rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  border-radius: 30px;
  width: 80%;
  height: 2rem;
  font-size: 1.5rem;
  padding: 1rem;
`;

export const ImgButton = styled.span`
  cursor: pointer;
  padding: 0 1rem;
  &:hover{
    color:#fac711
  }
`;

export const SendButton = styled.span`
  cursor: pointer;
  &:hover{
    color:#fac711
  }
`;





