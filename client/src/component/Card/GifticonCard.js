import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setId } from '../../redux/gifticon/gifticonSlice';
import { CardBox, CardGallery } from '../../styles/CardStyle';
import { Button } from '../../styles/utils/Button';

const GifticonCard = ({ data, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, img, report, status, createdAt } = data;
  const token = localStorage.getItem('token');

  const handleClick = async () => {
    const {
      data: { gifticonInfo },
    } = await axios.get(`/gifticon/detail/${id}`, {
      headers: { authorization: token },
    });
    dispatch(setId(gifticonInfo.id));
    navigate(`/gifticon/detail/${gifticonInfo.id}`);
  };

  //TODO: status 버튼 hover effect 막기 / cursor: none 설정 필요
  return (
    <CardBox onClick={handleClick}>
      <CardGallery />
      <div>
        <div>{name}</div>
        <div>{createdAt.split('T')[0]} 기부</div>
        <Button>{status}</Button>
      </div>
    </CardBox>
  );
};

export default GifticonCard;
