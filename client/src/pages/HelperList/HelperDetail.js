import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FaAngleLeft,
  FaAngleRight,
  FaCircle,
  FaRegCircle,
} from 'react-icons/fa';
import ImageUploader from '../../component/ImageUploader';
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
  Img,
  UpBoxContentWho,
} from '../../styles/HelperList/HelperDetailStyle';
import Loader from '../../component/Loader';

const HelperDetail = () => {
  const { id } = useParams();
  const giverId = useSelector((state) => state.user.user.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helperInfo, setHelperInfo] = useState({
    img: '',
    vulnerable: ['아동청소년', '그 외'], // 정보없어 임의 지정
    slogan: '',
    name: '',
    description: '',
    gifticonCatergory: ['식품', '전자제품'], // 정보없어 임의 지정
    gallery: [
      'http://imagescdn.gettyimagesbank.com/500/201904/jv11349321.jpg',
      'https://www.geumsan.go.kr/site/nanum/img/main/mvisual_img01.jpg',
    ], // 정보없어 임의 지정
    location: '부산 부산진구 경마장로 1 (범전동)', //정보있지만 수정 필요
  });
  const [galleryPage, setGalleryPage] = useState(0);
  const [galleryLocation, setGalleryLocation] = useState([]);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getDetail = async () => {
    try {
      const { data } = await axios.get(`/helperlist/${id}`);
      setHelperInfo({ ...helperInfo, ...data });
    } catch (e) {}
  };

  const makeLocationArr = (tureIndex) => {
    const result = Array(helperInfo.gallery.length).fill(false);
    result[tureIndex] = true;
    return result;
  };

  const handlePage = (move) => {
    if (
      galleryPage + move >= 0 &&
      galleryPage + move < helperInfo.gallery.length
    ) {
      setGalleryPage(galleryPage + move);
      setGalleryLocation(makeLocationArr(galleryPage + move));
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      getDetail();
      const arr = Array(helperInfo.gallery.length).fill(false);
      arr[0] = true;
      setGalleryLocation(makeLocationArr(0));
    };
    setTimeout(() => {
      getData();
    }, 100);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  console.log(helperInfo);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <UpBox>
            <UpBoxProfile src={helperInfo.img} />
            <UpBoxContent>
              {helperInfo.vulnerable.map((list, idx) => (
                <ContentTag key={idx}>{`#${list}`}</ContentTag>
              ))}
              <UpBoxContentTitle>{helperInfo.slogan}</UpBoxContentTitle>
              <UpBoxContentWho>{helperInfo.name}</UpBoxContentWho>
              <Button style={{ margin: 'auto' }} onClick={handleModalOpen}>
                기부하기
              </Button>
            </UpBoxContent>
          </UpBox>
          <DownBox>
            <DownBoxTitle>소개글</DownBoxTitle>
            <DownBoxTitle>필요한 기프티콘</DownBoxTitle>
            {helperInfo.gifticonCatergory.map((tag, idx) => (
              <ContentTag key={idx}>{`#${tag}`}</ContentTag>
            ))}
            <DownBoxTitle>활동 갤러리</DownBoxTitle>
            <Img src={helperInfo.gallery[galleryPage]} />
            <FaAngleLeft onClick={() => handlePage(-1)} />
            {galleryLocation.map((location, idx) =>
              location ? <FaCircle key={idx} /> : <FaRegCircle key={idx} />,
            )}
            <FaAngleRight onClick={() => handlePage(1)} />
            <DownBoxTitle>활동 지역</DownBoxTitle>
            {/* 현재 서버에서 location 설정 제대로 해야함 */}
            {/* <Map address={helperInfo.location}} />  */}
            <Map address={'부산 부산진구 경마장로 1 (범전동)'} />
          </DownBox>
          {id}
          <Button onClick={handleModalOpen}>기부하기</Button>
          {isModalOpen ? (
            <ImageUploader
              handleModalOpen={handleModalOpen}
              includeMessage="true"
              api={`/helperlist/${id}`}
              giverId={giverId}
              helperId={parseInt(id)}
            ></ImageUploader>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default HelperDetail;
