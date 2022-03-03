import { useNavigate } from 'react-router-dom';
import {
  CardBox,
  CardContent,
  CardGallery,
  HelperImage,
  HelperName,
  Slogan,
  EmptyBox,
} from '../../styles/CardStyle';

import noimg from '../../img/noimg.png';

const NOIMAGE = noimg;

const Card = ({ id, name, img, slogan, gallery }) => {
  const navigate = useNavigate();
  const sliced =
    slogan && slogan.length > 20 ? `${slogan.slice(0, 15)}...` : `${slogan}`;

  return (
    <CardBox onClick={() => navigate(`/helperlist/detail/${id}`)}>
      {gallery === undefined ? (
        <EmptyBox>
          <CardGallery src={NOIMAGE} empty />
        </EmptyBox>
      ) : (
        <CardGallery src={gallery} />
      )}
      <CardContent>
        <HelperImage src={img} />
        <HelperName>{name}</HelperName>
      </CardContent>
      <Slogan>{slogan === null ? '아직 정보가 없어요 🥲' : `${sliced}`}</Slogan>
    </CardBox>
  );
};

export default Card;
