import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import {
  CardBox,
  CardContent,
  CardGallery,
  GifticonInfo,
} from '../../styles/CardStyle';
import { GifticonStatusButton } from '../../styles/Gifticon/GifticonStyle';
import noimage from '../../img/noimg.png';
import { getTokenThunk, refreshTokenThunk } from '../../redux/utils/auth';

const NOIMAGE = noimage;

const GifticonCard = ({ data, name }) => {
  const who = useSelector((state) => state.user.user.who);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, status, img, createdAt } = data;

  const [text, setText] = useState('');
  const [textStyle, setTextStyle] = useState('');

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    const {
      data: { gifticonInfo, thanksImgUrl },
    } = await axios.get(`/gifticon/detail/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(
      setInfo({
        id: gifticonInfo.id,
        name: who === 1 ? gifticonInfo.helper.name : gifticonInfo.giver.name,
        userId: who === 1 ? gifticonInfo.helper.id : gifticonInfo.giver.id,
        createdAt: gifticonInfo.createdAt.split('T')[0],
        status: text,
        img: gifticonInfo.img,
        report: gifticonInfo.report,
        textStyle,
        point: gifticonInfo.point,
        thanksImgUrl: thanksImgUrl === null ? NOIMAGE : thanksImgUrl,
      }),
    );
    navigate(`/gifticon/detail/${id}`);
  };

  const getBtnText = () => {
    if (status === 'used') {
      setText('사용함');
      setTextStyle(1);
    } else if (status === 'accepted') {
      setText('수락함');
      setTextStyle(1);
    } else if (status === 'checking') {
      setText('확인중');
      setTextStyle(1);
    } else if (status === 'rejected') {
      setText('거절됨');
      setTextStyle(2);
    } else if (status === 'expired') {
      setText('만료됨');
      setTextStyle(2);
    } else if (status === 'reported') {
      setText('신고됨');
      setTextStyle(2);
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
        // console.log('can not refresh');
        console.log(e);
      }
    }
  };
  useEffect(() => {
    verifyingToken();
    getBtnText();
  }, [data]);

  return (
    <CardBox onClick={handleClick}>
      <CardGallery src={img} />
      <CardContent gifticon>
        <GifticonInfo gifticon>{name}</GifticonInfo>
        <GifticonInfo>{createdAt.split('T')[0]} 기부</GifticonInfo>
        <GifticonStatusButton text={text} textStyle={textStyle}>
          {text}
        </GifticonStatusButton>
      </CardContent>
    </CardBox>
  );
};

export default GifticonCard;
