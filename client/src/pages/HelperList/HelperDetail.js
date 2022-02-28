import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWho } from '../../redux/user/userSlice';
import ImageUploader from '../../component/Modal/ImageUploader';
import { setPrev } from '../../redux/page/pageSlice';
import Map from '../../component/SignUp/Map';
import {
  Container,
  UpBox,
  DownBox,
  Button,
  ContentTag,
  DownBoxTitle,
  UpBoxProfile,
  UpBoxContent,
  UpBoxContentTitle,
  UpBoxContentWho,
} from '../../styles/HelperList/HelperDetailStyle';
import Loader from '../../component/Loader';
import ImgSlider from '../../component/ImgSlider';
import ModalV2 from '../../component/Modal/ModalV2';

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
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <UpBox>
            <UpBoxProfile src={helperInfo.img} />
            <UpBoxContent>
              {helperInfo.vulnerable.map((id, idx) => (
                <ContentTag key={idx}>{`#${
                  vulnerableList[id - 1]
                }`}</ContentTag>
              ))}
              <UpBoxContentTitle>{helperInfo.slogan}</UpBoxContentTitle>
              <UpBoxContentWho>{helperInfo.name}</UpBoxContentWho>
              {who !== 2 && (
                <Button style={{ margin: 'auto' }} onClick={handleModalOpen}>
                  기부하기
                </Button>
              )}
            </UpBoxContent>
          </UpBox>
          <DownBox>
            <DownBoxTitle>소개글</DownBoxTitle>
            <div>{helperInfo.description}</div>
            <DownBoxTitle>필요한 기프티콘</DownBoxTitle>
            {helperInfo.gifticonCategory &&
              helperInfo.gifticonCategory.map((id, idx) => (
                <ContentTag key={idx}>{`#${gifticonList[id - 1]}`}</ContentTag>
              ))}
            <DownBoxTitle>활동 갤러리</DownBoxTitle>
            <ImgSlider data={helperInfo.gallery} />
            <DownBoxTitle>활동 지역</DownBoxTitle>
            <Map address={helperInfo.location} />
          </DownBox>
          {who !== 2 && <Button onClick={handleModalOpen}>기부하기</Button>}
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
        </>
      )}
    </Container>
  );
};
export default HelperDetail;
