import styled from 'styled-components';


export const Container = styled.div`
  position: relative;
  width: 90%;
  height: 50rem;
  left: 50%;
  transform: translateX(-50%);
  border: solid 1px;
  border-color: grey;
  display: flex;
  font-size: 1rem;
  font-weight: 300;
  margin: 4rem 0;
`;

export const RoomContainer = styled.div`
  width: 30%;
  border-right: 1px solid grey;
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
  width:100%;
`;

export const DialogueWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  height: 43rem;
`;

export const ProfileImg = styled.img`
  border-radius: 70px;
  width: 40px;
  height: 40px;
`;

export const Message = styled.div`
  display: flex;
  border-radius: 30px;
  font-size: 1.5rem;
  font-weight: 200;
  margin: 1rem 0;
  padding: 0.5rem 2rem;

  &.myMessage {
    background-color: #fac711;
    justify-content: flex-end;
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
  &.myMessage {
    background-color: #fac711;
    margin-left:auto;
    display:block;
  }
  &.yourMessage {
    background-color: #58D68D;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
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

export const Time = styled.div`
  font-size: 0.8rem;
  color: grey;
  padding-right: 1rem;
  padding-bottom: 2rem;
  &.myMessage {
    text-align: right;
  }
  &.yourMessage {
  }
`;

export const NoroomContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;