import { useEffect, useRef } from 'react';
import { ModalBackground, ModalFrame } from '../../styles/Modal/ModalStyle';

import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import { getToken } from '../../redux/utils/auth';

const Button = styled.div`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.main};
  cursor: pointer;
`;

const GifticonReportModal = ({ reportModal, setReportModal }) => {
  const gifticon = useSelector((state) => state.gifticon);
  const outside = useRef();
  const dispatch = useDispatch();

  const handleModalClose = (e) => {
    if (outside.current === e.target) {
      setReportModal(false);
    }
  };

  const handleYes = async () => {
    const token = localStorage.getItem('token');
    const {
      data: { report, status },
    } = await axios.put(
      `/report/${gifticon.id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (status === 'reported') {
      dispatch(
        setInfo({ ...gifticon, report, status: '신고됨', textStyle: 2 }),
      );
    }
    setReportModal(false);
  };

  const handleNo = () => {
    setReportModal(false);
  };
  const verifyingToken = async () => {
    try {
      const rest = await dispatch(getTokenThunk()).unwrap();
      if (rest < 60 * 10) {
        refreshToken();
      }
    } catch (e) {
      if (e.response.status === 401) {
        refreshToken();
      }
    }
  };

  const refreshToken = async () => {
    try {
      await dispatch(refreshTokenThunk()).unwrap();
    } catch (e) {
      if (e.response.status === 401) {
        console.log(e);
        // console.log('can not refresh');
      }
    }
  };

  useEffect(() => {
    verifyingToken();
  });

  return (
    <ModalBackground ref={outside} onClick={(e) => handleModalClose(e)}>
      <ModalFrame>
        <div>정말로 신고하시겠어요?</div>
        <div>한번 신고한 기프티콘은 사용할 수 없습니다.</div>
        <Button onClick={handleYes}>네</Button>
        <Button onClick={handleNo}>아니오</Button>
      </ModalFrame>
    </ModalBackground>
  );
};

export default GifticonReportModal;
