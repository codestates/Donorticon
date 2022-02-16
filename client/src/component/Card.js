import {
  CardBox,
  CardContent,
  CardGallery,
  Img,
  Name,
  Slogan,
} from '../styles/CardStyle';

const Card = ({ id, name, img, slogan }) => {
  return (
    <CardBox>
      <CardGallery />
      <CardContent>
        <Img src={img} />
        <Name>{name}</Name>
        <Slogan>{slogan}</Slogan>
      </CardContent>
    </CardBox>
  );
};

export default Card;
