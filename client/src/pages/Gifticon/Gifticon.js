import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/Loader';
import Pagination from '../../component/Pagination/Pagination';
import GifticonCard from '../../component/Card/GifticonCard';
import GiticonFilter, {
  gifticonStatus,
} from '../../component/Filtering/GifticonFilter';
import { CardContainer } from '../../styles/CardStyle';
import { Div, GifticonContainer } from '../../styles/Gifticon/GifticonStyle';

const Gifticon = () => {
  const navigate = useNavigate();
  const who = useSelector((state) => state.user.user.who);

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);

  const [grade, setGrade] = useState('');

  const [statusId, setStatusId] = useState(0);

  const handleStatusClick = (name) => {
    const filtered = gifticonStatus.filter((x) => x.name === name);
    const id = filtered[0].id;
    setStatusId(id);
  };

  const getGifticonList = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get(
        `/gifticon?page=${currentPage}&limit=9`,

        { headers: { Authorization: `Bearer ${token}`, Status: statusId } },
      );
      const { gifticonList, maxPage, count } = data;
      setList(gifticonList);
      setMaxPage(maxPage);
      setCount(count);
      navigate(`/gifticon?page=${currentPage}&limit=9`);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(async () => {
  //   setGifticon(request.data.gifticonList);
  //   setGrade(request.data.userInfo.grade_id);
  // }, []);

  useEffect(() => getGifticonList(), [currentPage, statusId]);

  //TODO: gifticon list.length === 0일때 문구 필요

  return (
    <GifticonContainer>
      <GiticonFilter
        statusId={statusId}
        handleStatusClick={handleStatusClick}
      />
      {who && who === 1 && <Div>레벨 이미지 여기 있어야 함</Div>}
      {who && who === 1 && <Div>Your Grade is.... ${grade || 0}!</Div>}
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
                  name={who === 1 ? gifticon.giver.name : gifticon.helper.name}
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
