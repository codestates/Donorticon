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
    slogan && slogan.length > 24 ? `${slogan.slice(0, 24)}...` : `${slogan}`;

  const getFirstGallery = (id) => {
    if (gallery.length === 0) {
      return NOIMAGE;
    } else {
      for (let i = 0; i < gallery.length; i++) {
        if (gallery[i].helper_id === id) {
          return gallery[i].img;
        }
      }
    }
  };

  return (
    <CardBox onClick={() => navigate(`/helperlist/detail/${id}`)}>
      {gallery.length === 0 ? (
        <EmptyBox>
          <CardGallery src={getFirstGallery(id)} />
        </EmptyBox>
      ) : (
        <CardGallery src={getFirstGallery(id)} />
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
