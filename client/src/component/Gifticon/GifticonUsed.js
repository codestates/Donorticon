import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPoint } from '../../redux/gifticon/gifticonSlice';
import { CardGallery } from '../../styles/CardStyle';
import {
  GifticonBox,
  GifticonButton,
  PointImage,
  Title,
} from '../../styles/Gifticon/GifticonDetailStyle';
import black from '../../img/point_black.png';
import red from '../../img/point_red.png';
import ImageUploader from '../ImageUploader';

// 임시 데이터
import img from '../../img/helperCategory/1_all.png';

const BLACK = black;
const RED = red;

const ARRAY = [0, 1, 2, 3, 4];

const GifticonUsed = () => {
  const who = useSelector((state) => state.user.user.who);
  const { id, name, userId, point, thanksImgUrl } = useSelector(
    (state) => state.gifticon,
  );
  const user = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleImgUpload = () => {
    handleModalOpen();
  };

  const handleMessage = async () => {
    await axios.post(`/gifticon/detail/${id}`, {message: message, giverId: userId, helperId: user, gifticonId:id});
    // setVal(''); this code can remove texts on textarea. Disabled on purpose.
    setMessage('');
    alert("Done!");
  };

  const [clicked, setClicked] = useState([]);
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

  const [val, setVal] = useState('');
  const [message, setMessage] = useState('');

  const handleText = (event) => {
    setMessage(event.target.value);
    setVal(event.target.value);
  }  

  useEffect(() => getPoint(), []);
  useEffect(() => sendPoint(), [clicked]);
  return (
    <>
      {who && who === 1 && thanksImgUrl !== null ? (
        <>
          <Title>{name}님이 보낸 인증사진</Title>
          <CardGallery style={{ width: '100px', height: '100px' }} src={img} />
        </>
      ) : (
        <span>웁스! 아직 {name}님께서 인증사진을 보내주시지 않았어요</span>
      )}
      {who && who === 2 && (
        <>
          <Title>인증사진</Title>
          <GifticonBox>
            <div style={{ marginRight: '20px' }}>
              <CardGallery
                style={{ width: '100px', height: '100px' }}
                src={img}
              />
            </div>
            <GifticonButton onClick={handleImgUpload}>
              사진 업로드
            </GifticonButton>
          </GifticonBox>
          <Title>감사메세지</Title>
          <GifticonBox>
            <textarea col={50} style={{ marginRight: '20px' }} value={val} onChange={handleText}/>
            <GifticonButton onClick={handleMessage}>
              {name}님에게 메세지 전송
            </GifticonButton>
          </GifticonBox>
          <Title>감사운 마음을 연탄 포인트로 표현하세요! (최대 5개)</Title>
          <GifticonBox>
            {ARRAY.map((x) => (
              <PointImage
                id={x}
                key={x}
                src={clicked[x] ? RED : BLACK}
                onClick={(e) => handlePoint(e)}
              />
            ))}
          </GifticonBox>
          {isModalOpen ? <ImageUploader handleModalOpen={handleModalOpen} api={`/gifticon/detail/${id}`} giverId={userId} helperId={user} gifticonId={id}></ImageUploader> : null}
        </>
      )}
    </>
  );
};

export default GifticonUsed;
