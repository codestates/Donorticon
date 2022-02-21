import ImageUploader from "../../component/ImageUploader";
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from "axios";
import { useSelector } from 'react-redux';

const socket = io('http://localhost:5000');
socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`)
})

const DM = () => {
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [dialogues, setDialogues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleMessage = (event) => {
    setMessage(event.target.value);
  }

  const sendMessage = async () => {
    socket.emit('send-message',message);
  }

  const getRooms = async () => {
    const roomRequest = await axios.get('/dm', {headers: user});
    setRooms(roomRequest.data.roomList);
  }

  const getDialogues = async (data) => {
    const dialogueRequest = await axios.get(`/dm?room=${data.id}`);
    console.log(dialogueRequest);
  }

  useEffect(() => getRooms(), []);

  return (
    <div>
      <div>DM room list</div>  
      <br />
      <br />
      {rooms.map((item, index) => (
        <div value={item} onClick={() => getDialogues(item)} key={index}>
          <div>Profile Image: {item.helper.img}</div>
          <div>Name: {item.helper.name}</div>
          <br />
          <br />
        </div>
      ))}
      <br />
      <br />
      <br />
      <div>Chat room</div>
      <br />      
      <br />     
      <input type='text' onChange={handleMessage}></input>
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
