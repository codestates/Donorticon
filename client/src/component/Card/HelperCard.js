import {
  CardBox,
  CardContent,
  CardGallery,
  Img,
  Name,
  Slogan,
} from '../../styles/CardStyle';

const Card = ({ id, name, img, slogan }) => {
  //TODO: slogan 문구 길이가 예를들어 20개 이상인경우 slice 걸어야함

  return (
    <CardBox>
      <CardGallery />
      <CardContent>
        <Img src={img} />
        <Name>{name}</Name>
      </CardContent>
      <Slogan>{slogan}</Slogan>
    </CardBox>
  );
};

export default Card;
