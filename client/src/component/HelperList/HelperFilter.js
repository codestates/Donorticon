import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../component/Pagination/Pagination';
import HelperCard from '../../component/HelperList/HelperCard';
import {
  HelperCategoryBox,
  HelperCategoryContainer,
  HelperContent,
  Image,
  ImageBackground,
  Name,
  NoMessage,
} from '../../styles/HelperList/HelperCategoryStyle';
import {
  GifticonCategoryBox,
  GifticonCategoryContainer,
  GifticonContent,
} from '../../styles/HelperList/GifticonCategoryStyle';
import { CardContainer, HelperBox } from '../../styles/CardStyle';
import { HelperHeightContainer } from '../../styles/utils/Container';
import all from '../../img/helperCategory/1_all.png';
import child from '../../img/helperCategory/2_child.png';
import old from '../../img/helperCategory/3_old.png';
import disable from '../../img/helperCategory/4_disable.png';
import global from '../../img/helperCategory/5_global.png';
import women from '../../img/helperCategory/6_women.png';
import mental from '../../img/helperCategory/7_mental.png';
import etc from '../../img/helperCategory/8_etc.png';
import Loader from '../Loader';

const helperCategory = [
  { id: 0, name: '전체보기', src: all },
  { id: 1, name: '아동청소년', src: child },
  { id: 2, name: '어르신', src: old },
  { id: 3, name: '장애인', src: disable },
  { id: 4, name: '다문화', src: global },
  { id: 5, name: '가족/여성', src: women },
  { id: 6, name: '정신질환자', src: mental },
  { id: 7, name: '그 외', src: etc },
];

const gifticonCategory = [
  { id: 0, name: '전체' },
  { id: 1, name: '식품' },
  { id: 2, name: '화장품' },
  { id: 3, name: '임신/출산/유아용품' },
  { id: 4, name: '디지털/가전' },
  { id: 5, name: '의류' },
  { id: 6, name: '리빙/주방/꽃' },
  { id: 7, name: '레저/스포츠' },
  { id: 8, name: '상품권/영화/도서' },
];

const HelperFilter = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [helperCategoryId, setHelperCategoryId] = useState(0);
  const [gifticonCategoryId, setGifticonCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getList = async (id) => {
    try {
      const { data } = await axios.get(
        `/helperlist/category/${id}?page=${currentPage}&limit=9`,
        { params: { gifticon: gifticonCategoryId } },
      );
      const { list, maxPage, galleryList } = data;
      setGalleryList(galleryList);
      if (gifticonCategoryId !== 0) {
        const filteredList = list.map((x) => x.helper);
        setList(filteredList);
        setMaxPage(maxPage);
      } else {
        setList(list);
        setMaxPage(maxPage);
      }
      navigate(`/helperlist/category/${id}?page=${currentPage}&limit=9`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleHelperClick = (name) => {
    const filtered = helperCategory.filter((x) => x.name === name);
    const id = filtered[0].id;
    setCurrentPage(1);
    setHelperCategoryId(id);
  };

  const handleGificonClcik = (name) => {
    const filtered = gifticonCategory.filter((x) => x.name === name);
    const id = filtered[0].id;
    setGifticonCategoryId(id);
  };

  const getFilteredList = async (id) => {
    setCurrentPage(1);
    try {
      const { data } = await axios.get(
        `/helperlist/category/${id}?page=${currentPage}&limit=9`,
        { params: { gifticon: gifticonCategoryId } },
      );
      const { list, maxPage, galleryList } = data;
      setGalleryList(galleryList);
      const filteredList = list.map((x) => x.helper);
      setList(filteredList);
      setMaxPage(maxPage);
      navigate(`/helperlist/category/${id}?page=${currentPage}&limit=9`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = () => {
      if (helperCategoryId === 0) {
        getList(helperCategoryId);
      } else {
        getFilteredList(helperCategoryId);
      }
    };
    setTimeout(() => {
      getData();
    }, 100);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [currentPage, helperCategoryId, gifticonCategoryId]);

  return (
    <>
      <HelperCategoryContainer>
        <HelperCategoryBox>
          {helperCategory.map((category, idx) => {
            const name = category.name;
            const id = category.id;
            return (
              <HelperContent key={idx}>
                <ImageBackground
                  className={`${helperCategoryId === id && 'active'}`}
                  onClick={() => handleHelperClick(name)}
                >
                  <Image src={category.src} />
                </ImageBackground>
                <Name
                  className={`${helperCategoryId === id && 'active'}`}
                  onClick={() => handleHelperClick(name)}
                >
                  {name}
                </Name>
              </HelperContent>
            );
          })}
        </HelperCategoryBox>
      </HelperCategoryContainer>
      <GifticonCategoryContainer>
        <GifticonCategoryBox>
          {gifticonCategory.map((category, idx) => {
            const name = category.name;
            const id = category.id;
            return (
              <GifticonContent
                key={idx}
                className={`${gifticonCategoryId === id && 'active'}`}
                onClick={() => handleGificonClcik(name)}
              >
                {category.name}
              </GifticonContent>
            );
          })}
        </GifticonCategoryBox>
      </GifticonCategoryContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {list.length === 0 ? (
            <NoMessage>등록된 Helper가 없어요 🥲</NoMessage>
          ) : (
            <>
              <HelperHeightContainer>
                <HelperBox>
                  <CardContainer>
                    {list.map((helper) => {
                      return (
                        <HelperCard
                          id={helper.id}
                          name={helper.name}
                          img={helper.img}
                          slogan={helper.slogan}
                          key={helper.id}
                          gallery={galleryList}
                        />
                      );
                    })}
                  </CardContainer>
                </HelperBox>
              </HelperHeightContainer>
              {maxPage > 0 && (
                <Pagination
                  maxPage={maxPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default HelperFilter;
