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
import GiverLevel from '../../component/GiverLevel';

const Gifticon = () => {
  const navigate = useNavigate();
  const who = useSelector((state) => state.user.user.who);

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);
  const [point, setPoint] = useState(0);
  const [grade, setGrade] = useState(0);
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
      const { gifticonList, maxPage, count, point, grade } = data;
      setList(gifticonList);
      setMaxPage(maxPage);
      if (count !== null) {
        setCount(count);
      }
      if (point !== null) {
        setPoint(point);
      }
      if (grade !== null) {
        setGrade(grade);
      }
      navigate(`/gifticon?page=${currentPage}&limit=9`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => getGifticonList(), [currentPage, statusId]);

  //TODO: gifticon list.length === 0일때 문구 필요

  return (
    <GifticonContainer>
      {who && who === 1 && <GiverLevel grade={grade} />}
      <GiticonFilter
        statusId={statusId}
        handleStatusClick={handleStatusClick}
        list={list}
      />

      <Div style={{ fontSize: '20px' }}>
        현재까지 {count}회 기부를 {who === 2 ? '받으셨네요!' : '하셨네요!'}
      </Div>
      {list === undefined ? (
        <Loader />
      ) : list.length === 0 ? (
        <>
          <Div>
            아직 {who && who === 1 ? '기부하신' : '기부받은'} 기프티콘이 없네요!
          </Div>
          {who && who === 1 && (
            <Div>Donorticon을 통해 기프티콘을 기부해보세요!</Div>
          )}
        </>
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
