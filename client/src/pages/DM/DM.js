import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FaImage, FaPaperPlane, FaRegCommentDots } from 'react-icons/fa';
import ImageUploader from '../../component/Modal/ImageUploader';
import {
  RoomContainer,
  ReceiverImg,
  ReceiverName,
  Time,
  ReceiverWrapper,
  NoroomContainer,
  DialogueWrapper,
  Input,
  ImgButton,
  SendButton,
  DMContainer,
  ChatContainer,
  SubContainer,
  SelectMessage,
  MessageContent,
  MessageBox,
  MessageProfileImg,
  GifticonImage,
  ButtonBox,
  BottomWrapper,
  BottomBox,
  RoomTop,
  RoomBottom,
  RoomIcon,
} from '../../styles/DM/DMStyle';
import { FaAngleLeft } from 'react-icons/fa';
import { getTokenThunk, refreshTokenThunk } from '../../redux/utils/auth';

const socket = io(process.env.REACT_APP_SERVER);
socket.on('connect', () => {});

const DM = () => {
  const dispatch = useDispatch();
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
  const [mobileDialogue, setMobileDialoge] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    socket.emit('send-image', currentRoom);
  };

  const handleMessage = (event) => {
    setVal(event.target.value);
    setMessage(event.target.value);
  };

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
  };

  const getRooms = async () => {
    const token = localStorage.getItem('token');
    const roomRequest = await axios.get('/dm', {
      headers: { token, who: who },
    });
    setRooms(roomRequest.data.roomList);
  };

  const getDialogues = async (data) => {
    let dialogueRequest = await axios.get(`/dm?room=${data.id}`);
    if (dialogueRequest.data.dialogues[0]) {
      setGiverId(dialogueRequest.data.dialogues[0].giver_id);
      setHelperId(dialogueRequest.data.dialogues[0].helper_id);
    }
    socket.emit('leave-room', currentRoom);
    setCurrentRoom(data.id);
    socket.emit('join-room', data.id);

    if (user.who === 1) {
      setProfileImg(data.helper.img);
    } else if (user.who === 2) {
      setProfileImg(data.giver.img);
    }

    setDialogues(dialogueRequest.data.dialogues);
    setMobileDialoge(true);
  };

  const handleBackIcon = () => {
    setMobileDialoge(false);
  };

  const handleWidth = () => {
    const width = window.innerWidth;
    if (width <= 528) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const verifyingToken = async () => {
    try {
      const rest = await dispatch(getTokenThunk()).unwrap();
      if (rest < 60 * 10) {
        refreshToken();
      }
    } catch (e) {
      if (e.response.status === 401) {
        refreshToken();
      }
    }
  };

  const refreshToken = async () => {
    try {
      await dispatch(refreshTokenThunk()).unwrap();
    } catch (e) {
      if (e.response.status === 401) {
        console.log(e);
        // console.log('can not refresh');
      }
    }
  };

  useEffect(() => {
    verifyingToken();
    getRooms();
    handleWidth();
  }, []);

  socket.on('received-message', async (currentRoom) => {
    let dialogueRequest = await axios.get(`/dm?room=${currentRoom}`);
    setDialogues(dialogueRequest.data.dialogues);
  });

  return (
    <DMContainer>
      <SubContainer>
        <RoomContainer mobileDialogue={mobileDialogue}>
          <RoomTop>
            {isMobile && mobileDialogue && (
              <RoomIcon>
                <FaAngleLeft onClick={handleBackIcon} />
              </RoomIcon>
            )}
            {user.name}
          </RoomTop>
          <RoomBottom mobileDialogue={mobileDialogue}>
            {rooms.map((item, index) => (
              <ReceiverWrapper
                value={item}
                onClick={() => getDialogues(item)}
                key={index}
                className={item.id === currentRoom && 'current'}
              >
                <ReceiverImg
                  src={user.who === 1 ? item.helper.img : item.giver.img}
                />
                <ReceiverName>
                  {user.who === 1 ? item.helper.name : item.giver.name}
                </ReceiverName>
              </ReceiverWrapper>
            ))}
          </RoomBottom>
        </RoomContainer>
        {dialogues.length > 0 ? (
          <ChatContainer mobileDialogue={mobileDialogue}>
            <DialogueWrapper>
              {dialogues.map((item, index) => (
                <div key={index}>
                  {item.img && item.type === who && (
                    <>
                      <GifticonImage
                        className={
                          item.type === who ? 'myMessage' : 'yourMessage'
                        }
                        src={item.img}
                      />
                      <Time className={item.type === who && 'myMessage'}>
                        {`${item.createdAt.slice(
                          5,
                          7,
                        )}??? ${item.createdAt.slice(8, 10)}???`}
                      </Time>
                    </>
                  )}
                  {item.img && item.type !== who && (
                    <>
                      <MessageBox notMe>
                        <MessageProfileImg src={profileImg} />
                        <GifticonImage
                          className={
                            item.type === who ? 'myMessage' : 'yourMessage'
                          }
                          src={item.img}
                        />
                      </MessageBox>
                      <Time className={item.type === who && 'myMessage'}>
                        {`${item.createdAt.slice(
                          5,
                          7,
                        )}??? ${item.createdAt.slice(8, 10)}???`}
                      </Time>
                    </>
                  )}
                  {item.message && item.type === who && (
                    <>
                      <MessageBox>
                        <MessageContent>{item.message}</MessageContent>
                      </MessageBox>
                      <Time className={item.type === who && 'myMessage'}>
                        {`${item.createdAt.slice(
                          5,
                          7,
                        )}??? ${item.createdAt.slice(8, 10)}???`}
                      </Time>
                    </>
                  )}
                  {item.message && item.type !== who && (
                    <>
                      <MessageBox notMe>
                        <MessageProfileImg src={profileImg} />
                        <MessageContent notMe>{item.message}</MessageContent>
                      </MessageBox>
                      <Time className={item.type === who && 'myMessage'}>
                        {`${item.createdAt.slice(
                          5,
                          7,
                        )}??? ${item.createdAt.slice(8, 10)}???`}
                      </Time>
                    </>
                  )}
                </div>
              ))}
            </DialogueWrapper>
            <BottomWrapper>
              <BottomBox>
                <Input
                  type="text"
                  value={val}
                  onChange={handleMessage}
                  onKeyDown={sendMessage}
                />
                <ButtonBox>
                  <ImgButton>
                    <FaImage size="20" onClick={handleModalOpen}></FaImage>
                  </ImgButton>
                  <SendButton>
                    <FaPaperPlane
                      size="20"
                      onClick={sendMessage}
                    ></FaPaperPlane>
                  </SendButton>
                </ButtonBox>
              </BottomBox>
            </BottomWrapper>
          </ChatContainer>
        ) : (
          <NoroomContainer>
            <FaRegCommentDots size="80" opacity="0.5" className="icon" />
            <SelectMessage>????????? ???????????? ??????????????????!</SelectMessage>
          </NoroomContainer>
        )}
      </SubContainer>

      {isModalOpen && (
        <ImageUploader
          handleModalOpen={handleModalOpen}
          api="/dm"
          roomId={currentRoom}
          giverId={giverId}
          helperId={helperId}
          type={who}
        ></ImageUploader>
      )}
    </DMContainer>
  );
};

export default DM;
