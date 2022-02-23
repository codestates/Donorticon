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

import styled from 'styled-components';
import GifticonReportModal from '../../component/Gifticon/GifticonReportModal';
const Button = styled.button`
  padding: 10px;
  color: ${({ theme }) => theme.color.error};
  border: 1px solid ${({ theme }) => theme.color.error};
  cursor: pointer;
`;

const GifticonDetail = ({ data }) => {
  const gifticon = useSelector((state) => state.gifticon);
  const who = useSelector((state) => state.user.user.who);
  
  const { name, createdAt, status, img, report, textStyle } = gifticon;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBtnClick = () => {
    setIsModalOpen(true);
  };

  const [reportModal, setReportModal] = useState(false);
  const handleReportButton = () => {
    setReportModal(true);
  };

  return (
    <GifticonDetailContainer>
      <Title top>기프티콘 상세정보</Title>
      <GifticonBox>
        <a href={img} target="_blank" rel="noreferrer noopener">
          <CardGallery style={{ width: '200px', height: '300px' }} src={img} />
        </a>
        <div>
          {status !== '사용함' && who === 2 && (
            <Button onClick={handleReportButton}>
              {report ? '신고 완료' : '신고하기'}
            </Button>
          )}
          {reportModal &&
            who === 2 &&
            status !== '사용함' &&
            report === false && (
              <GifticonReportModal
                reportModal={reportModal}
                setReportModal={setReportModal}
              />
            )}
          <GifticonInputBox>
            <div>
              {who === 1 ? 'helper' : 'giver'} {name}
            </div>
            <div>기부날짜 {createdAt}</div>
            {report === false && (
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
            )}
          </GifticonInputBox>
        </div>
      </GifticonBox>
      {status === '사용함' && <GifticonUsed />}
      {isModalOpen && who === 2 && status !== '사용함' && (
        <GifticonStatusModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </GifticonDetailContainer>
  );
};

export default GifticonDetail;
