import styled from 'styled-components';

export const DMContainer = styled.div`
  width: 100%;
  padding: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 20px 10px;
  }
`;

export const SubContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  height: 800px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    flex-direction: column;
  }
`;

// 왼쪽 부분
export const RoomContainer = styled.div`
  width: 30%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.color.lightGrey};
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const RoomTop = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGrey};
  font-weight: 500;
  width: 100%;
  height: 10%;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;

export const RoomBottom = styled.div`
  height: 90%;
  overflow-y: scroll;
`;

export const ReceiverWrapper = styled.div`
  padding: 20px;
  display: flex;
  cursor: pointer;
  align-items: center;
  &:hover {
    background-color: #ffe18e;
  }
  &.current {
    background-color: ${({ theme }) => theme.color.main};
  }
`;

export const ReceiverImg = styled.img`
  border-radius: 70px;
  width: 40px;
  height: 40px;
`;

export const ReceiverName = styled.div`
  padding-left: 20px;
`;

// 오른쪽 대화창 부분
export const ChatContainer = styled.div`
  width: 70%;
  height: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    display: ${(props) => (props.mobileDialogue ? 'block' : 'none')};
  }
`;

export const MobileChatContainer = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
    height: 100%;
  }
`;

export const DialogueWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;
  height: 90%;
  padding: 20px;
`;

export const ProfileImg = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.notMe && 'row'};
  align-items: ${(props) => props.notMe && 'flex-end'};
  justify-content: ${(props) => (props.notMe ? 'flex-start' : 'flex-end')};
  margin: 10px 0;
`;

export const MessageProfileImg = styled.div`
  background-image: url(${(props) => props.src});
  border-radius: 30px;
  width: 30px;
  height: 30px;
  border: 1px solid red;
`;

export const MessageContent = styled.div`
  background-color: ${(props) =>
    props.notMe ? 'none' : `${props.theme.color.main}`};
  border: ${(props) =>
    props.notMe ? `1px solid ${props.theme.color.main}` : 'none'};
  padding: 20px;
  border-radius: 20px;
`;

export const GifticonImage = styled.img`
  width: 300px;
  border-radius: 30px;
  padding: 5px 0;
  margin-top: 5px;
  &.myMessage {
    background-color: ${({ theme }) => theme.color.main};
    margin-left: auto;
    display: block;
  }
  &.yourMessage {
    border: 1px solid ${({ theme }) => theme.color.main};
  }
`;

export const BottomWrapper = styled.div`
  padding: 20px;
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const BottomBox = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  display: flex;
  border-radius: 30px;
`;

export const Input = styled.input`
  all: unset;
  width: 80%;
  padding: 10px 20px;
`;

export const ButtonBox = styled.div`
  width: 20%;
  text-align: right;
  padding: 10px 20px;
`;

export const ImgButton = styled.span`
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

export const SendButton = styled.span`
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

export const Time = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.color.lightGrey};
  margin-top: 5px;
  margin-right: 5px;
  &.myMessage {
    text-align: right;
  }
  &.yourMessage {
  }
`;

// 오른쪽 대화창 부분 - 처음 화면 접속시
export const NoroomContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    margin-bottom: 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export const SelectMessage = styled.div`
  font-size: 20px;
`;
