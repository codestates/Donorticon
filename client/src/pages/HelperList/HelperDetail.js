import { useParams } from 'react-router-dom';
import ImageUploader from '../../component/ImageUploader';
import { useEffect, useState } from 'react';
import { userSlice } from '../../redux/user/userSlice';
import { useSelector } from 'react-redux';
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
} from '../../styles/helperDetail/helperDetailStyle';
import axios from 'axios';

const HelperDetail = () => {
  const { id } = useParams();
  const giverId = useSelector((state) => state.user.user.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helperInfo, setHelperInfo] = useState({
    img: '',
    vulnerable: ['아동청소년', '그 외'],
    slogan: '',
    name: '',
    description: '',
    gifticonCatergory: ['식품', '전자제품'],
    gallery: [
      'http://imagescdn.gettyimagesbank.com/500/201904/jv11349321.jpg',
      'https://www.geumsan.go.kr/site/nanum/img/main/mvisual_img01.jpg',
    ],
    location: '',
  });
  const [galleryIdx, setGalleryIdx] = useState('0');
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getDetail = async () => {
    try {
      const { data } = await axios.get(`/helperlist/${id}`);
      console.log(data);
      setHelperInfo({ ...helperInfo, ...data });
    } catch (e) {}
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Container>
      <UpBox>
        <UpBoxProfile src={helperInfo.img} />
        <UpBoxContent>
          {helperInfo.vulnerable.map((list, idx) => (
            <ContentTag key={idx}>{`#${list}`}</ContentTag>
          ))}
          <UpBoxContentTitle>{helperInfo.slogan}</UpBoxContentTitle>
          <UpBoxContentWho>{helperInfo.name}</UpBoxContentWho>
          <Button style={{ margin: 'auto' }}>기부하기</Button>
        </UpBoxContent>
      </UpBox>
      <DownBox>
        <DownBoxTitle>소개글</DownBoxTitle>
        <DownBoxTitle>필요한 기프티콘</DownBoxTitle>
        {helperInfo.gifticonCatergory.map((tag, idx) => (
          <ContentTag key={idx}>{`#${tag}`}</ContentTag>
        ))}
        <DownBoxTitle>활동 갤러리</DownBoxTitle>
        <Img src={helperInfo.gallery[galleryIdx]} />
        <DownBoxTitle>활동 지역</DownBoxTitle>
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
    </Container>
  );
};

export default HelperDetail;
