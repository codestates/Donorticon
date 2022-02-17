import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import HelperCard from './Card/HelperCard';
import { CardContainer } from '../styles/CardStyle';
import Pagination from './Pagination/Pagination';

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

      setList(helperlist);
      setMaxPage(maxPage);
      setCount(count);
    } catch (e) {
      console.log(e);
    }
  };

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
                <HelperCard
                  id={helper.id}
                  name={helper.name}
                  img={helper.img}
                  slogan={helper.slogan}
                  key={helper.id}
                />
              );
            })}
          </CardContainer>
          <Pagination
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
