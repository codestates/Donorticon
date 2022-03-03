import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWho } from '../../redux/user/userSlice';
import ImageUploader from '../../component/Modal/ImageUploader';
import { setPrev } from '../../redux/page/pageSlice';
import Loader from '../../component/Loader';
import ImageSlider from '../../component/HelperDetail/ImageSlider';
import Map from '../../component/SignUp/Map';
import ModalV2 from '../../component/Modal/ModalV2';
import { FaHeart } from 'react-icons/fa';
import {
  HelperDetailContainer,
  HelperDetailBox,
  ProfileImg,
  Category,
  CategoryName,
  Slogan,
  HelperName,
  TopBox,
  LeftBox,
  RightBox,
  DonateButton,
  BottomBox,
  Content,
  Title,
  Icon,
  BottomButton,
} from '../../styles/HelperDetail/HelperDetailStyle';

const vulnerableList = [
  '아동/청소년',
  '어르신',
  '장애인',
  '다문화',
  '가족/여성',
  '정신질환자',
  '그 외',
];

const gifticonList = [
  '식품',
  '화장품',
  '임신/출산/유아동',
  '디지털/가전',
  '의류',
  '리빙/주방/꽃',
  '레저/스포츠',
  '상품권/영화/도서',
];

const HelperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const giverId = useSelector((state) => state.user.user.id);
  const who = useSelector((state) => state.user.user.who);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helperInfo, setHelperInfo] = useState({
    img: '',
    slogan: '',
    name: '',
    description: '',
    location: '',
    vulnerable: [],
    gifticonCategory: [],
    gallery: [],
  });

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getDetail = async () => {
    try {
      const { data } = await axios.get(`/helperlist/${id}`);
      setHelperInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLoginModal = (e) => {
    handleModalOpen();
    if (e.target.textContent === '네') {
      dispatch(setPrev(window.location.pathname));
      dispatch(setWho(1));
      navigate('/signin');
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      getDetail();
    };
    setTimeout(() => {
      getData();
    }, 100);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <HelperDetailContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <HelperDetailBox>
          <TopBox>
            <LeftBox>
              <ProfileImg src={helperInfo.img} />
            </LeftBox>
            <RightBox>
              <Category>
                {helperInfo.vulnerable.map((id, idx) => (
                  <CategoryName key={idx}>{`#${
                    vulnerableList[id - 1]
                  }`}</CategoryName>
                ))}
              </Category>
              <Slogan>
                {helperInfo.slogan
                  ? helperInfo.slogan
                  : '슬로건 정보가 없어요 🥲'}
              </Slogan>
              <HelperName>{helperInfo.name}</HelperName>
              {who !== 2 && (
                <DonateButton onClick={handleModalOpen}>기부하기</DonateButton>
              )}
            </RightBox>
          </TopBox>
          <BottomBox>
            <Title>
              <Icon>
                <FaHeart color="#ffce44" />
              </Icon>
              소개글
            </Title>
            <Content>
              {helperInfo.description
                ? helperInfo.description
                : '소개글 정보가 없어요 🥲'}
            </Content>
          </BottomBox>
          <BottomBox>
            <Title>
              <Icon>
                <FaHeart color="#ffce44" />
              </Icon>
              필요한 기프티콘
            </Title>
            <Content>
              {helperInfo.gifticonCategory &&
                helperInfo.gifticonCategory.map((id, idx) => (
                  <CategoryName key={idx}>{`#${
                    gifticonList[id - 1]
                  }`}</CategoryName>
                ))}
            </Content>
          </BottomBox>
          <BottomBox>
            <Title>
              <Icon>
                <FaHeart color="#ffce44" />
              </Icon>
              활동 내역
            </Title>
            {helperInfo.gallery.length !== 0 ? (
              <ImageSlider data={helperInfo.gallery} />
            ) : (
              <Content>활동 내역 사진이 없어요 🥲</Content>
            )}
          </BottomBox>
          <BottomBox>
            <Title>
              <Icon>
                <FaHeart color="#ffce44" />
              </Icon>
              활동 지역
            </Title>
            <Map detail address={helperInfo.location} />
          </BottomBox>
          {who !== 2 && (
            <BottomButton onClick={handleModalOpen}>기부하기</BottomButton>
          )}
          {isModalOpen && giverId === '' && (
            <ModalV2
              title="기부를 하려면 GIVER 로그인이 필요합니다 🥲"
              subtitle="로그인 페이지로 이동하시겠어요?"
              callback={handleLoginModal}
            />
          )}
          {isModalOpen && giverId !== '' && (
            <ImageUploader
              handleModalOpen={handleModalOpen}
              includeMessage="true"
              api={`/helperlist/${id}`}
              giverId={giverId}
              helperId={parseInt(id)}
            />
          )}
        </HelperDetailBox>
      )}
    </HelperDetailContainer>
  );
};
export default HelperDetail;
