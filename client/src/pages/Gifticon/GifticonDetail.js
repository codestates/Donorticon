import axios from 'axios';
import { useSelector } from 'react-redux';

const GifticonDetail = () => {
  const id = useSelector((state) => state.gifticon.id);
  console.log(id);
  return 'DETAIL';
};

export default GifticonDetail;
