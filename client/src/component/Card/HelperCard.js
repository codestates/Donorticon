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
  //TODO: slogan 문구 길이가 예를들어 20개 이상인경우 slice 걸어야함
  const navigate = useNavigate();

  return (
    <CardBox onClick={() => navigate(`/helperlist/detail/${id}`)}>
      <CardGallery />
      <CardContent>
        <HelperImage src={img} />
        <HelperName>{name}</HelperName>
      </CardContent>
      <Slogan>{slogan}</Slogan>
    </CardBox>
  );
};

export default Card;
