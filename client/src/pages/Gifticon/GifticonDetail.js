import { useState } from 'react';
import { useSelector } from 'react-redux';
import GifticonStatusModal from '../../component/Gifticon/GifticonStatusModal';
import GifticonUsed from '../../component/Gifticon/GifticonUsed';
import { CardGallery } from '../../styles/CardStyle';
import {
  GifticonBox,
  GifticonDetailContainer,
  GifticonInputBox,
  Title,
} from '../../styles/Gifticon/GifticonDetailStyle';
import { GifticonStatusButton } from '../../styles/Gifticon/GifticonStyle';

const GifticonDetail = ({ data }) => {
  const gifticon = useSelector((state) => state.gifticon);
  const who = useSelector((state) => state.user.user.who);

  const { name, createdAt, status, img, report, textStyle } = gifticon;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBtnClick = () => {
    setIsModalOpen(true);
  };
  //TODO: status가 사용함일 경우에만, 하단 부분에 인증사진 출력

  return (
    <GifticonDetailContainer>
      <Title top>기프티콘 상세정보</Title>
      <GifticonBox>
        <a href={img} target="_blank" rel="noreferrer noopener">
          <CardGallery style={{ width: '200px', height: '300px' }} src={img} />
        </a>
        <GifticonInputBox>
          <div>
            {who === 1 ? 'helper' : 'giver'} {name}
          </div>
          <div>기부날짜 {createdAt}</div>
          <div>
            진행상태
            <GifticonStatusButton
              style={{
                cursor: who === 1 ? 'not-allowed' : 'pointer',
                width: '100px',
              }}
              text={status}
              textStyle={textStyle}
              onClick={handleBtnClick}
            >
              {status}
            </GifticonStatusButton>
          </div>
        </GifticonInputBox>
      </GifticonBox>
      {status === '사용함' && who === 2 && <GifticonUsed />}
      {isModalOpen && who === 2 ? (
        <GifticonStatusModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
    </GifticonDetailContainer>
  );
};

export default GifticonDetail;
