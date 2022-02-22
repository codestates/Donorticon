import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import { CardBox, CardGallery } from '../../styles/CardStyle';
import { GifticonStatusButton } from '../../styles/Gifticon/GifticonStyle';

const GifticonCard = ({ data, name }) => {
  const who = useSelector((state) => state.user.user.who);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [textStyle, setTextStyle] = useState('');

  const { id, img, report, status, createdAt } = data;

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    const {
      data: { gifticonInfo },
    } = await axios.get(`/gifticon/detail/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(gifticonInfo);
    dispatch(
      setInfo({
        id,
        name: who === 1 ? gifticonInfo.helper.name : gifticonInfo.giver.name,
        userId: who === 1 ? gifticonInfo.helper.id : gifticonInfo.giver.id,
        createdAt: createdAt.split('T')[0],
        status: text,
        img,
        report,
        textStyle,
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
    }
  };

  useEffect(() => getBtnText(), [data]);

  //TODO: status 버튼 hover effect 막기 / cursor: none 설정 필요
  return (
    <CardBox onClick={handleClick}>
      <CardGallery src={img} />
      <div>
        <div>{name}</div>
        <div>{createdAt.split('T')[0]} 기부</div>
        <GifticonStatusButton text={text} textStyle={textStyle}>
          {text}
        </GifticonStatusButton>
      </div>
    </CardBox>
  );
};

export default GifticonCard;
