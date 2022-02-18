import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  CategoryBox,
  CategoryContainer,
  CategoryContent,
  CategoryImage,
  CategoryImageBg,
  CategoryName,
} from '../styles/HelperCategoryStyle';
import all from '../img/helperCategory/1_all.png';
import child from '../img/helperCategory/2_child.png';
import old from '../img/helperCategory/3_old.png';
import disable from '../img/helperCategory/4_disable.png';
import global from '../img/helperCategory/5_global.png';
import women from '../img/helperCategory/6_women.png';
import mental from '../img/helperCategory/7_mental.png';
import etc from '../img/helperCategory/8_etc.png';
import CardList from './Card/CardList';
import { useNavigate } from 'react-router-dom';

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

const HelperFilter = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);
  const [helperCategoryId, SetHelperCategoryId] = useState(0);

  const getList = async () => {
    SetHelperCategoryId(0);
    try {
      //   console.log('여기여기', helperCategoryId);
      const { data } = await axios.get(
        `/helperlist/category/${helperCategoryId}?page=${currentPage}&limit=9`,
      );
      const { list: helperList, maxPage, count } = data;
      setList(helperList);
      setMaxPage(maxPage);
      setCount(count);
      navigate(
        `/helperlist/category/${helperCategoryId}?page=${currentPage}&limit=9`,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleNameClick = async (name) => {
    const filtered = helperCategory.filter((x) => x.name === name);
    const id = filtered[0].id;
    setCurrentPage(1);
    SetHelperCategoryId(id);
  };

  const getFilteredList = async (id) => {
    if (id === 0) {
      return getList();
    } else {
      //   console.log('카테고리아이디', id);
      setCurrentPage(1);
      try {
        const { data } = await axios.get(
          `/helperlist/category/${id}?page=${currentPage}&limit=9`,
        );
        const { list, maxPage, count } = data;
        const filteredList = list.map((x) => x.helper);
        setList(filteredList);
        setMaxPage(maxPage);
        setCount(count);
        navigate(
          `/helperlist/category/${helperCategoryId}?page=${currentPage}&limit=9`,
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  //   useEffect(() => getList(), []);

  useEffect(() => {
    if (helperCategoryId === 0) {
      getList();
    } else {
      getFilteredList(helperCategoryId);
    }
  }, [currentPage, helperCategoryId]);

  return (
    <>
      <CategoryContainer>
        <CategoryBox>
          {helperCategory.map((x, idx) => {
            const name = x.name;
            return (
              <CategoryContent key={idx}>
                <CategoryImageBg onClick={() => handleNameClick(name)}>
                  <CategoryImage src={x.src} />
                </CategoryImageBg>
                <CategoryName onClick={() => handleNameClick(name)}>
                  {name}
                </CategoryName>
              </CategoryContent>
            );
          })}
        </CategoryBox>
      </CategoryContainer>
      <CardList
        list={list}
        maxPage={maxPage}
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default HelperFilter;
