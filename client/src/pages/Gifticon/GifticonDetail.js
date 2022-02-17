import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CardGallery } from '../../styles/CardStyle';

const Button = styled.button``;
const GifticonDetail = () => {
  const gifticon = useSelector((state) => state.gifticon);
  const who = useSelector((state) => state.user.user.who);

  const { name, createdAt, status, img, report } = gifticon;

  return (
    <>
      <div>기프티콘 상세정보</div>
      <CardGallery style={{ width: '200px', height: '300px' }} />
      <div>
        {who === 'giver' ? 'helper' : 'giver'} {name}
      </div>
      <div>기부날짜 {createdAt}</div>
      <div>
        진행상태 <Button>{status}</Button>
      </div>
    </>
  );
};

export default GifticonDetail;
