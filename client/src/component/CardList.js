import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Card from './Card';
import { CardContainer } from '../styles/CardStyle';
import Pagenation from './Pagenation/Pagenation';

const HelperList = () => {
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
      console.log(helperlist);
      setList(helperlist);
      setMaxPage(maxPage);
      setCount(count);
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(list);
  useEffect(() => getList(), [currentPage]);
  return (
    <>
      {list === undefined ? (
        <Loader />
      ) : (
        <>
          <CardContainer>
            {list.map((helper) => {
              return (
                <Card
                  id={helper.id}
                  name={helper.name}
                  img={helper.img}
                  slogan={helper.slogan}
                  key={helper.id}
                />
              );
            })}
          </CardContainer>
          <Pagenation
            maxPage={maxPage}
            currentPage={currentPage}
            count={count}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default HelperList;