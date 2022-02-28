import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPoint } from '../../redux/gifticon/gifticonSlice';
import ImageUploader from '../Modal/ImageUploader';
import { CardGallery } from '../../styles/CardStyle';
import { ContentBox, ContentTitle, ImageBox } from '../../styles/CommonStyle';
import {
  ButtonBox,
  GifticonMessage,
  GifticonUsedButton,
  JustForStyle,
  NoImgMessage,
  PointImage,
} from '../../styles/Gifticon/GifticonUsedStyle';
import black from '../../img/point_black.png';
import red from '../../img/point_red.png';
import ModalV2 from '../Modal/ModalV2';

const BLACK = black;
const RED = red;

const ARRAY = [0, 1, 2, 3, 4];

const GifticonUsed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.id);
  const who = useSelector((state) => state.user.user.who);
  const { id, name, userId, point, thanksImgUrl } = useSelector(
    (state) => state.gifticon,
  );

  const [clicked, setClicked] = useState([]);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [val, setVal] = useState('');
  const [message, setMessage] = useState('');
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsImgModalOpen(!isImgModalOpen);
  };

  const handleImgUpload = () => {
    handleModalOpen();
  };

  const handleMessage = async () => {
    const data = await axios.post(`/gifticon/detail/${id}`, {
      message: message,
      giverId: userId,
      helperId: user,
      gifticonId: id,
    });
    if (data.status === 200) {
      setMessage('');
      setIsCheckModalOpen(true);
    }
  };

  const handlePoint = (e) => {
    const id = e.target.id;
    let clickStates = [false, false, false, false, false];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= id ? true : false;
    }
    setClicked(clickStates);
  };

  const getPoint = () => {
    if (point === 0) return;

    if (point !== 0) {
      let clickStates = [false, false, false, false, false];
      for (let i = 0; i < point; i++) {
        clickStates[i] = i < point ? true : false;
      }
      setClicked(clickStates);
    }
  };

  const sendPoint = async () => {
    const token = localStorage.getItem('token');
    const point = clicked.filter((x) => x === true).length;
    try {
      const {
        data: { updatedPoint },
      } = await axios.put(
        `/gifticon/detail/${id}`,
        { point, giverId: userId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(setPoint(updatedPoint));
    } catch (e) {
      console.log(e);
    }
  };

  const handleText = (event) => {
    setMessage(event.target.value);
    setVal(event.target.value);
  };

  const handleCheckModal = (e) => {
    if (e.target.textContent === '네') {
      navigate('/dm');
    } else {
      setIsCheckModalOpen(false);
    }
  };

  useEffect(() => getPoint(), []);
  useEffect(() => sendPoint(), [clicked]);

  return (
    <>
      {who && who === 1 && thanksImgUrl !== null && (
        <>
          <ContentTitle top>{name}님이 보낸 인증사진</ContentTitle>
          <ContentBox>
            <ImageBox>
              <CardGallery
                style={{ width: '100%', height: '300px' }}
                src={thanksImgUrl}
              />
            </ImageBox>
          </ContentBox>
        </>
      )}
      {/*TODO: 인증 사진이 없는 경우 메세지 말고 다른 방법있을까? */}
      {who && who === 1 && thanksImgUrl === null && (
        <NoImgMessage>
          웁스! 아직 {name}님께서 인증사진을 보내주시지 않았어요
        </NoImgMessage>
      )}
      {who && who === 2 && (
        <>
          <ContentTitle top>인증사진</ContentTitle>
          <ContentBox>
            <ImageBox>
              <CardGallery
                style={{ width: '100%', height: '300px' }}
                src={thanksImgUrl}
              />
            </ImageBox>
            <ButtonBox>
              <JustForStyle />
              <GifticonUsedButton onClick={handleImgUpload}>
                사진 업로드
              </GifticonUsedButton>
            </ButtonBox>
          </ContentBox>
          <ContentTitle top>감사메세지</ContentTitle>
          <ContentBox>
            <GifticonMessage
              placeholder={'감사메세지를 적어주세요'}
              value={val}
              onChange={handleText}
            />
            <ButtonBox>
              <JustForStyle />
              <GifticonUsedButton onClick={handleMessage}>
                {name}님에게 메세지 전송
              </GifticonUsedButton>
            </ButtonBox>
          </ContentBox>
          <ContentTitle top>
            감사운 마음을 연탄 포인트로 표현하세요!
            <br />
            (최대 5개)
          </ContentTitle>
          <ContentBox row>
            {ARRAY.map((x) => (
              <PointImage
                id={x}
                key={x}
                src={clicked[x] ? RED : BLACK}
                onClick={(e) => handlePoint(e)}
              />
            ))}
          </ContentBox>
          {isImgModalOpen && (
            <ImageUploader
              handleModalOpen={handleModalOpen}
              api={`/gifticon/detail/${id}`}
              giverId={userId}
              helperId={user}
              gifticonId={id}
            />
          )}
          {isCheckModalOpen && (
            <ModalV2
              title={'메세지가 성공적으로 전달되었습니다.'}
              subtitle={'메세지 페이지로 이동하시겠어요?'}
              callback={handleCheckModal}
            />
          )}
        </>
      )}
    </>
  );
};

export default GifticonUsed;
