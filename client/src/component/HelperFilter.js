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

const category = [
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
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);

  const getList = async () => {
    try {
      const { data } = await axios.get(
        `/helperlist?page=${currentPage}&limit=9`,
      );
      const { list: helperlist, maxPage, count } = data;
      setList(helperlist);
      setMaxPage(maxPage);
      setCount(count);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNameClick = async (name) => {
    const filtered = category.filter((x) => x.name === name);
    const id = filtered[0].id;
    setCurrentPage(1);
    getFilteredList(id);
  };

  const getFilteredList = async (id) => {
    try {
      if (id === 0) {
        return getList();
      }
      const { data } = await axios.get(
        `/helperlist/category/${id}?page=${currentPage}&limit=9`,
      );
      const { list, maxPage, count } = data;
      const filteredList = list.map((x) => x.helper);
      setList(filteredList);
      setMaxPage(maxPage);
      setCount(count);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => getList(), []);

  return (
    <>
      <CategoryContainer>
        <CategoryBox>
          {category.map((x, idx) => {
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
