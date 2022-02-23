import { useState } from 'react';
import { useSelector } from 'react-redux';
import GifticonStatusModal from '../../component/Gifticon/GifticonStatusModal';
import GifticonUsed from '../../component/Gifticon/GifticonUsed';
import SideBar from '../../component/SideBar';
import { CardGallery } from '../../styles/CardStyle';
import {
  BottomContainer,
  CommonContainer,
  InputBox,
  InputContent,
  InputLabel,
  TopContainer,
  ContentContainer,
  ContentTitle,
  ContentBox,
  ImageBox,
  InfoBox,
} from '../../styles/Gifticon/GifticonDetailStyle';
import { GifticonStatusButton } from '../../styles/Gifticon/GifticonStyle';

import { SubTitle, Title } from '../../styles/utils/Container';
import GifticonReport from '../../component/Gifticon/GifticonReport';



const GifticonDetail = ({ data }) => {
  const gifticon = useSelector((state) => state.gifticon);
  const who = useSelector((state) => state.user.user.who);
  const username = useSelector((state) => state.user.user.name);

  const { name, createdAt, status, img, report, textStyle } = gifticon;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBtnClick = () => {
    setIsModalOpen(true);
  };

  return (
    <CommonContainer>
      <TopContainer>
        <Title>{who === 1 ? 'GIVER' : 'HELPER'}</Title>
        {/* TODO: 모바일에서 출력 두줄로 해야함 */}
        <SubTitle>{username}님 반가워요!</SubTitle>
      </TopContainer>
      <BottomContainer>
        <SideBar />
        <ContentContainer>
          <ContentTitle top>기프티콘 상세정보</ContentTitle>
          <ContentBox>
            <ImageBox>
              <a href={img} target="_blank" rel="noreferrer noopener">
                <CardGallery
                  style={{ width: '100%', height: '300px' }}
                  src={img}
                />
              </a>
            </ImageBox>
            <InfoBox>
              <GifticonReport />
              <InputBox>
                <div>
                  <InputLabel>
                    {who === 1 ? 'helper 이름' : 'giver 이름'}
                  </InputLabel>
                  <InputContent>{name}</InputContent>
                </div>
                <div>
                  <InputLabel>기부날짜</InputLabel>
                  <InputContent>{createdAt}</InputContent>
                </div>
                {report === false && (
                  <div>
                    <InputLabel>진행상태</InputLabel>
                    <InputContent noLine>
                      <GifticonStatusButton
                        style={{
                          cursor: who === 1 ? 'not-allowed' : 'pointer',
                        }}
                        text={status}
                        textStyle={textStyle}
                        onClick={handleBtnClick}
                      >
                        {status}
                      </GifticonStatusButton>
                    </InputContent>
                  </div>
                )}
              </InputBox>
            </InfoBox>
          </ContentBox>
          {status === '사용함' && <GifticonUsed />}
          {isModalOpen && who === 2 && status !== '사용함' && (
            <GifticonStatusModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </ContentContainer>
      </BottomContainer>
    </CommonContainer>
  );
};

export default GifticonDetail;
