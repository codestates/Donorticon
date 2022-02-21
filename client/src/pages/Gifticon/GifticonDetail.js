import { useState } from 'react';
import { useSelector } from 'react-redux';
import GifticonStatusModal from '../../component/GifticonStatusModal';
import { CardGallery } from '../../styles/CardStyle';
import { GifticonButton } from '../../styles/Gifticon/GifticonStyle';

const GifticonDetail = () => {
  const gifticon = useSelector((state) => state.gifticon);
  const who = useSelector((state) => state.user.user.who);

  const { name, createdAt, status, img, report, textStyle } = gifticon;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBtnClick = () => {
    setIsModalOpen(true);
  };
  //TODO: status가 사용함일 경우에만, 하단 부분에 인증사진 출력

  return (
    <>
      <div>기프티콘 상세정보</div>
      <a href={img} target='_blank' rel='noreferrer noopener'><CardGallery style={{ width: '200px', height: '300px' }} src={img}/></a>
      <div>
        {who === 1 ? 'helper' : 'giver'} {name}
      </div>
      <div>기부날짜 {createdAt}</div>
      <div>
        진행상태
        <GifticonButton
          style={{ cursor: who === 1 ? 'not-allowed' : 'pointer' }}
          text={status}
          textStyle={textStyle}
          onClick={handleBtnClick}
        >
          {status}
        </GifticonButton>
      </div>
      {isModalOpen && who === 2 ? (
        <GifticonStatusModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
    </>
  );
};

export default GifticonDetail;
