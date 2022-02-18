import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../component/Loader';
import { CardContainer } from '../../styles/CardStyle';
import Pagination from '../../component/Pagination/Pagination';
import GifticonCard from '../../component/Card/GifticonCard';
import { useSelector } from 'react-redux';

const GifticonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  padding: 20px 0;
`;

const Gifticon = () => {
  const who = useSelector((state) => state.user.user.who);

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);

  const [grade, setGrade] = useState('');

  const getList = async () => {
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.get(
        `/gifticon?page=${currentPage}&limit=9`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const { gifticonList, maxPage, count } = data;
      setList(gifticonList);
      setMaxPage(maxPage);
      setCount(count);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(async () => {
  //   setGifticon(request.data.gifticonList);
  //   setGrade(request.data.userInfo.grade_id);
  // }, []);

  useEffect(() => getList(), [currentPage]);

  return (
    <GifticonContainer>
      <Div>GIFTICON FILTERING 있어야 해</Div>
      <Div>이미지 여기 있어야 함 그 옆에 어떤레벨인지 문구</Div>
      <Div>Your Grade is.... {grade || 0}!</Div>
      <Div style={{ fontSize: '20px' }}>
        현재까지 {count}회 기부를 {who === 2 ? '받으셨네요!' : '하셨네요!'}
      </Div>
      {list === undefined ? (
        <Loader />
      ) : (
        <>
          <CardContainer>
            {list.map((gifticon) => {
              return (
                <GifticonCard
                  key={gifticon.id}
                  data={gifticon}
                  name={who === 2 ? gifticon.giver.name : gifticon.helper.name}
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
    </GifticonContainer>
  );
};

export default Gifticon;
