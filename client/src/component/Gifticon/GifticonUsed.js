import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardGallery } from '../../styles/CardStyle';
import {
  GifticonBox,
  GifticonButton,
  PointImage,
  Title,
} from '../../styles/Gifticon/GifticonDetailStyle';
import black from '../../img/point_black.png';
import red from '../../img/point_red.png';

// 임시 데이터
import img from '../../img/helperCategory/1_all.png';
import { setPoint } from '../../redux/gifticon/gifticonSlice';

const BLACK = black;
const RED = red;

const ARRAY = [0, 1, 2, 3, 4];

const GifticonUsed = () => {
  const { id, name, userId, point } = useSelector((state) => state.gifticon);
  const dispatch = useDispatch();

  const handleImgUpload = () => {
    //TODO: 수영님 요기다 이미지 업로드 관련 코드 설정해주시면 됩니당!
    console.log('사진 업로드');
  };

  const handleMessage = () => {
    console.log('send msg');
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
    // 만약 포인트가 5점이라면 연탄 5개 모두가 레드색이어야함
    if (point !== 0) {
      let clickStates = [false, false, false, false, false];
      for (let i = 0; i < point; i++) {
        clickStates[i] = i < point ? true : false;
      }
      setClicked(clickStates);
    }
    console.log(clicked);
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

  useEffect(() => getPoint(), []);
  useEffect(() => sendPoint(), [clicked]);
  return (
    <>
      <Title>인증사진</Title>
      <GifticonBox>
        <div style={{ marginRight: '20px' }}>
          <CardGallery style={{ width: '100px', height: '100px' }} src={img} />
        </div>
        <GifticonButton onClick={handleImgUpload}>사진 업로드</GifticonButton>
      </GifticonBox>
      <Title>감사메세지</Title>
      <GifticonBox>
        <textarea col={50} style={{ marginRight: '20px' }} />
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
    </>
  );
};

export default GifticonUsed;
