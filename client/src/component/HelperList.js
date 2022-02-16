import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Card from './Card';
import { CardBox, CardContainer } from '../styles/CardStyle';

const HelperList = () => {
  const [page, setPate] = useState(1);
  const [list, setList] = useState();
  const getList = async () => {
    try {
      const { data } = await axios.get(`/helperlist?page=${page}&limit=9`);
      setList(data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(list);
  useEffect(() => getList(), []);
  return (
    <>
      {list === undefined ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default HelperList;
