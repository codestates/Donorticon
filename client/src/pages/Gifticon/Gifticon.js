import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/Loader';
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
import {
  GifticonHeightContainer,
  SubTitle,
  Title,
} from '../../styles/utils/Container';
import {
  BoldText,
  CountMessage,
  DonateButton,
  NoGifticonMessage,
} from '../../styles/Gifticon/GifticonStyle';

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

  const handleButton = () => {
    navigate('/helperlist/category/0?page=1&limit=9');
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getGifticonList();
    }, 100);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [currentPage, statusId]);

  return (
    <CommonContainer>
      <TopContainer>
        <Title>{who === 1 ? 'GIVER' : 'HELPER'}</Title>
        <SubTitle>{username}님 반가워요!</SubTitle>
      </TopContainer>
      <BottomContainer>
        <SideBar />
        <ContentContainer>
          <GiticonFilter
            statusId={statusId}
            handleStatusClick={handleStatusClick}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {who === 1 && <GifticonLevel point={point} count={count} />}
              {who === 1 && count === 0 && (
                <NoGifticonMessage center>
                  기부하신 기프티콘이 아직 없네요
                  <br />
                  기부하러 가보실까요?
                  <br />
                  <DonateButton onClick={handleButton}>기부하기</DonateButton>
                </NoGifticonMessage>
              )}
              {who === 2 && count !== 0 && (
                <CountMessage>
                  <BoldText>{count}회 기부</BoldText>를 받으셨어요!
                </CountMessage>
              )}
              {who === 2 && count === 0 && (
                <NoGifticonMessage>
                  아직 기프티콘 기부를 받지 못하셨어요
                </NoGifticonMessage>
              )}
              {count !== 0 && list.length === 0 && (
                <CountMessage>해당하는 기프티콘이 없네요!</CountMessage>
              )}
              {list.length !== 0 && (
                <>
                  <GifticonHeightContainer>
                    <CardContainer gifticon>
                      {list.map((gifticon) => {
                        return (
                          <GifticonCard
                            key={gifticon.id}
                            data={gifticon}
                            name={
                              who === 1
                                ? gifticon.helper.name
                                : gifticon.giver.name
                            }
                          />
                        );
                      })}
                    </CardContainer>
                  </GifticonHeightContainer>
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
        </ContentContainer>
      </BottomContainer>
    </CommonContainer>
  );
};

export default Gifticon;
