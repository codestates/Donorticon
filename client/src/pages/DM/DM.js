import ImageUploader from "../../component/ImageUploader";
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from "axios";
import { useSelector } from 'react-redux';
import { FaImage, FaPaperPlane, FaRegCommentDots } from 'react-icons/fa';
import { Container, RoomContainer, DialogueContainer, ReceiverImg, ReceiverName, ProfileImg, Time,ReceiverWrapper, NoroomContainer, DialogueWrapper, InputWrapper, Input, ImgButton, SendButton, Message, Image } from "../../styles/DM/DMStyle";

const socket = io('http://localhost:5000');
  socket.on('connect', () => {
})

const DM = () => {
  const user = useSelector((state) => state.user.user);
  const who = user.who;
  const [message, setMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [val, setVal] = useState('');
  const [dialogues, setDialogues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('');
  const [giverId, setGiverId] = useState('');
  const [helperId, setHelperId] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    socket.emit('send-image', currentRoom);
  }

  const handleMessage = (event) => {
    setVal(event.target.value);
    setMessage(event.target.value);
  }

  const sendMessage = async (event) => {
    if (message.length > 0) {
      if (event.key === 'Enter' || event.type === 'click') {
        setVal('');
        setMessage('');
        await socket.emit('send-message', message, currentRoom, who);
        let dialogueRequest = await axios.get(`/dm?room=${currentRoom}`);
        setDialogues(dialogueRequest.data.dialogues);
      }
    }
  }

  const getRooms = async () => {
    const roomRequest = await axios.get('/dm', {headers: {token: localStorage.getItem('token'), who: who}});
    setRooms(roomRequest.data.roomList);
  }

  const getDialogues = async (data) => {
    let dialogueRequest = await axios.get(`/dm?room=${data.id}`);
    if(dialogueRequest.data.dialogues[0]) {
      setGiverId(dialogueRequest.data.dialogues[0].giver_id);
      setHelperId(dialogueRequest.data.dialogues[0].helper_id);
    }
    setCurrentRoom(data.id)
    setProfileImg(data.img)
    setDialogues(dialogueRequest.data.dialogues);
  }

  useEffect(() => getRooms(), []);

  socket.on('received-message', async (currentRoom) => {
    let dialogueRequest = await axios.get(`/dm?room=${currentRoom}`);
    setDialogues(dialogueRequest.data.dialogues);
  })  

  return (
    <Container>
      <RoomContainer>
        {rooms.map((item, index) => (
          <ReceiverWrapper value={item} onClick={() => getDialogues(item)} key={index} className={item.id === currentRoom ? "current" : null}>
            <ReceiverImg src={user.who === 1 ? item.helper.img : item.giver.img}/>
            <ReceiverName>{user.who === 1 ? item.helper.name: item.giver.name} </ReceiverName>
          </ReceiverWrapper>
        ))}
      </RoomContainer>
      {dialogues.length > 0 ? 
        <DialogueContainer>
          <DialogueWrapper>
            {dialogues.map((item, index) => (
              <div key={index}>
                {item.type === who ? null: <ProfileImg src={profileImg}/>}
                {item.img ? <Image className={item.type === who ? 'myMessage' : 'yourMessage'}src={item.img} /> : null}
                {item.message ? <Message className={item.type === who ? 'myMessage' : 'yourMessage'}>{item.message}</Message> : null}
                <Time className={item.type === who ? 'myMessage' : 'yourMessage'}>{item.createdAt}</Time> 
              </div>
            ))}
          </DialogueWrapper>
          <InputWrapper>
            <Input type='text' value={val} onChange={handleMessage} onKeyDown={sendMessage}></Input>     
            <ImgButton><FaImage size="25" onClick={handleModalOpen}></FaImage></ImgButton>
            <SendButton><FaPaperPlane size="25" onClick={sendMessage}></FaPaperPlane></SendButton>
          </InputWrapper>
        </DialogueContainer>
      :<NoroomContainer><FaRegCommentDots size="30" opacity="0.5" />Select a Room</NoroomContainer>}
      {isModalOpen ? <ImageUploader handleModalOpen={handleModalOpen} api='/dm' roomId={currentRoom} giverId={giverId} helperId={helperId} type={who}></ImageUploader> : null}
    </Container>
  );
}

export default DM;
