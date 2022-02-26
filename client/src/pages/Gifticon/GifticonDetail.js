import { useSelector } from 'react-redux';
import GifticonUsed from '../../component/Gifticon/GifticonUsed';
import GifticonReport from '../../component/Gifticon/GifticonReport';
import SideBar from '../../component/SideBar';
import StatusDropDown from '../../component/Gifticon/StatusDropDown';
import { CardGallery } from '../../styles/CardStyle';
import { SubTitle, Title } from '../../styles/utils/Container';
import {
  BottomContainer,
  CommonContainer,
  ContentBox,
  ContentContainer,
  ContentTitle,
  ImageBox,
  TopContainer,
} from '../../styles/CommonStyle';
import {
  InfoBox,
  InputContent,
} from '../../styles/Gifticon/GifticonDetailStyle';
import { InputBox, InputLabel } from '../../styles/utils/Input';

const GifticonDetail = () => {
  const username = useSelector((state) => state.user.user.name);
  const who = useSelector((state) => state.user.user.who);
  const gifticon = useSelector((state) => state.gifticon);
  const giver = who === 1 ? 1 : 0;

  const { name, createdAt, status, img } = gifticon;

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
          <ContentTitle>기프티콘 상세정보</ContentTitle>
          <ContentBox>
            <ImageBox>
              {/* TODO: 이미지 클릭시 이미지 확대 */}
              <CardGallery
                style={{ width: '100%', height: '300px' }}
                src={img}
              />
            </ImageBox>
            <InfoBox>
              <GifticonReport />
              <InputBox giver={giver}>
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
                <div>
                  <InputLabel>진행상태</InputLabel>
                  <div style={{ width: '70%' }}>
                    <StatusDropDown />
                  </div>
                </div>
              </InputBox>
            </InfoBox>
          </ContentBox>
          {status === '사용함' && <GifticonUsed />}
        </ContentContainer>
      </BottomContainer>
    </CommonContainer>
  );
};

export default GifticonDetail;
