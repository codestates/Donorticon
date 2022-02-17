import { useEffect, useState } from 'react';
import { CardBox, CardGallery } from '../../styles/CardStyle';
import { Button } from '../../styles/utils/Button';

const GifticonCard = ({ data, name }) => {
  const { img, report, status, createdAt } = data;

  return (
    <CardBox>
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
