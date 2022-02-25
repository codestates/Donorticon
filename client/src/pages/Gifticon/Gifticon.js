import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../component/Pagination/Pagination';
import GifticonCard from '../../component/Gifticon/GifticonCard';
import GiticonFilter, {
  gifticonStatus,
} from '../../component/HelperList/GifticonFilter';
import GifticonLevel from '../../component/Gifticon/GifticonLevel';
import SideBar from '../../component/SideBar';
import { CardContainer } from '../../styles/CardStyle';
import {
  BottomContainer,
  CommonContainer,
  ContentContainer,
  TopContainer,
} from '../../styles/CommonStyle';
import { SubTitle, Title } from '../../styles/utils/Container';

const Gifticon = () => {
  const navigate = useNavigate();
  const who = useSelector((state) => state.user.user.who);
  const username = useSelector((state) => state.user.user.name);

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);
  const [point, setPoint] = useState(0);
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Status: statusId,
          },
        },
      );
      const { gifticonList, maxPage, count, point } = data;
      setList(gifticonList);
      setMaxPage(maxPage);
      if (count !== null) {
        setCount(count);
      }
      if (point !== null) {
        setPoint(point);
      }
      navigate(`/gifticon?page=${currentPage}&limit=9`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => getGifticonList(), [currentPage, statusId]);

  //  {
  //    who && who === 1 && <Div>Donorticon을 통해 기프티콘을 기부해보세요!</Div>;
  //  }

  return (
    <CommonContainer>
      <TopContainer>
        <Title>{who === 1 ? 'GIVER' : 'HELPER'}</Title>
        {/* TODO: 모바일에서 출력 두줄로 해야함 */}
        <SubTitle>{username}님 반가워요!</SubTitle>
      </TopContainer>
      <BottomContainer>
        <SideBar />
        <ContentContainer>
          <GiticonFilter
            statusId={statusId}
            handleStatusClick={handleStatusClick}
          />
          {who === 1 && <GifticonLevel point={point} count={count} />}
          {who === 2 && count !== 0 && (
            <div>현재까지 {count}회 기부를 받으셨네요!</div>
          )}
          {list.length === 0 ? (
            <>
              <div>해당 필터에 해당하는 기프티콘이 없네요!</div>
            </>
          ) : (
            <>
              <CardContainer gifticon>
                {list.map((gifticon) => {
                  return (
                    <GifticonCard
                      key={gifticon.id}
                      data={gifticon}
                      name={
                        who === 1 ? gifticon.helper.name : gifticon.giver.name
                      }
                    />
                  );
                })}
              </CardContainer>
              {maxPage > 0 && (
                <Pagination
                  maxPage={maxPage}
                  currentPage={currentPage}
                  count={count}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          )}
        </ContentContainer>
      </BottomContainer>
    </CommonContainer>
  );
};

export default Gifticon;
