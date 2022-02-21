import ImageUploader from "../../component/ImageUploader";
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from "axios";
import { useSelector } from 'react-redux';

const socket = io('http://localhost:5000');
  socket.on('connect', () => {
})

const DM = () => {
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [val, setVal] = useState('');
  const [dialogues, setDialogues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('');

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleMessage = (event) => {
    setVal(event.target.value);
    setMessage(event.target.value);
  }

  const sendMessage = async () => {
    setVal('');
    socket.emit('send-message', message, currentRoom);
  }

  const getRooms = async () => {
    const roomRequest = await axios.get('/dm', {headers: user});
    setRooms(roomRequest.data.roomList);
  }

  const getDialogues = async (data) => {
    const dialogueRequest = await axios.get(`/dm?room=${data.id}`);
    setCurrentRoom(data.id)
    setDialogues(dialogueRequest.data.dialogues);
  }

  useEffect(() => getRooms(), []);

  socket.on('received-message', async (currentRoom) => {
    const dialogueRequest = await axios.get(`/dm?room=${currentRoom}`);
    setDialogues(dialogueRequest.data.dialogues);
  })  

  return (
    <div>
      <div>DM room list</div>  
      <br />
      <br />
      {rooms.map((item, index) => (
        <div value={item} onClick={() => getDialogues(item)} key={index}>
          {user.who === 1 ? <div>Profile Image: {item.helper.img}</div> : <div>Profile Image: {item.giver.img}</div>}
          {user.who === 1 ? <div>Name: {item.helper.name}</div> : <div>Name: {item.giver.name}</div>}
          <br />
          <br />
        </div>
      ))}
      <br />
      <br />
      <br />
      <div>Chat room</div>
      <br />      
      {dialogues.map((item, index) => (
        <div key={index}>
          <span>{item.message}</span>
          <span>{item.createdAt}</span>
        </div>
      ))}
      <br />     
      <input type='text' value={val} onChange={handleMessage}></input>
      <br />      
      <br />      
      <button onClick={sendMessage}>Send Text</button>
      <br />      
      <br />
      <button onClick={handleModalOpen}>Send Image</button>
      {isModalOpen ? <ImageUploader></ImageUploader> : null}
    </div>
  );
}

export default DM;
