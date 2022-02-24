import { useRef } from 'react';
import { ModalBackground, ModalFrame } from '../../styles/utils/Modal';

import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../../redux/gifticon/gifticonSlice';

const Button = styled.div`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.main};
  cursor: pointer;
`;

const GifticonReportModal = ({ reportModal, setReportModal }) => {
  const gifticon = useSelector((state) => state.gifticon);
  const { id, userId } = useSelector((state) => state.gifticon);
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
      `/report/${id}`,
      { giverId: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch(setInfo({ ...gifticon, report, status }));
    setReportModal(false);
  };

  const handleNo = () => {
    setReportModal(false);
  };

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
