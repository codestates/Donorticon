import {
  CardBox,
  CardContent,
  CardGallery,
  HelperImage,
  HelperName,
  Slogan,
} from '../../styles/CardStyle';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, name, img, slogan }) => {
  const navigate = useNavigate();

  const sliced =
    slogan && slogan.length > 24 ? `${slogan.slice(0, 24)}...` : `${slogan}`;

  return (
    <CardBox onClick={() => navigate(`/helperlist/detail/${id}`)}>
      <CardGallery />
      <CardContent>
        <HelperImage src={img} />
        <HelperName>{name}</HelperName>
      </CardContent>
      <Slogan>{slogan === null ? '아직 정보가 없어요!' : `${sliced}`}</Slogan>
    </CardBox>
  );
};

export default Card;
