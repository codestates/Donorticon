import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import { CardBox, CardGallery } from '../../styles/CardStyle';
import { Button } from '../../styles/utils/Button';

const GifticonCard = ({ data, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const { id, img, report, status, createdAt } = data;

  const handleClick = async () => {
    dispatch(
      setInfo({
        id,
        name,
        createdAt: createdAt.split('T')[0],
        status: text,
        img,
        report,
      }),
    );
    navigate(`/gifticon/detail/${id}`);
  };

  const getBtnText = () => {
    if (status === 'used') {
      setText('사용함');
    } else if (status === 'accepted') {
      setText('수락함');
    } else if (status === 'checking') {
      setText('확인중');
    } else if (status === 'rejected') {
      setText('거절됨');
    } else if (status === 'expired') {
      setText('만료됨');
    }
  };

  useEffect(() => getBtnText(), [data]);

  //TODO: status 버튼 hover effect 막기 / cursor: none 설정 필요
  return (
    <CardBox onClick={handleClick}>
      <CardGallery />
      <div>
        <div>{name}</div>
        <div>{createdAt.split('T')[0]} 기부</div>
        <Button>{text}</Button>
      </div>
    </CardBox>
  );
};

export default GifticonCard;
