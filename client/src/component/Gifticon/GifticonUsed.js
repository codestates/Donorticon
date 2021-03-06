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
  PointImage,
} from '../../styles/Gifticon/GifticonUsedStyle';
import black from '../../img/point_black.png';
import red from '../../img/point_red.png';
import ModalV2 from '../Modal/ModalV2';
import { getTokenThunk, refreshTokenThunk } from '../../redux/utils/auth';

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
  const [message, setMessage] = useState('');
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

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

  const handleText = (event) => {
    setMessage(event.target.value);
    if (message !== '') {
      setIsReady(true);
    }
  };

  const handleCheckModal = (e) => {
    if (e.target.textContent === '???') {
      navigate('/dm');
    } else {
      setIsCheckModalOpen(false);
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
    getPoint();
  }, []);
  useEffect(() => sendPoint(), [clicked]);

  return (
    <>
      {who && who === 1 && thanksImgUrl && (
        <>
          <ContentTitle top>{name}?????? ?????? ????????????</ContentTitle>
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
      {who && who === 2 && (
        <>
          <ContentTitle top>????????????</ContentTitle>
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
                ?????? ?????????
              </GifticonUsedButton>
            </ButtonBox>
          </ContentBox>
          <ContentTitle top>???????????????</ContentTitle>
          <ContentBox>
            <GifticonMessage
              placeholder={'?????????????????? ???????????????'}
              onChange={handleText}
            />
            <ButtonBox>
              <JustForStyle />
              <GifticonUsedButton
                onClick={handleMessage}
                className={`${!isReady && 'disable'}`}
              >
                ????????? ??????
              </GifticonUsedButton>
            </ButtonBox>
          </ContentBox>
          <ContentTitle top line>
            ????????? ????????? ?????? ???????????? ???????????????!
            <br />
            (?????? 5???)
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
              buttonText={'?????? ?????????'}
            />
          )}
          {isCheckModalOpen && (
            <ModalV2
              title={'???????????? ??????????????? ?????????????????????.'}
              subtitle={'????????? ???????????? ??????????????????????'}
              callback={handleCheckModal}
            />
          )}
        </>
      )}
    </>
  );
};

export default GifticonUsed;
