import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReportButton,
  ReportButtonBox,
} from '../../styles/Gifticon/GifticonReportStyle';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import ModalV2 from '../Modal/ModalV2';

const GifticonReport = () => {
  const dispatch = useDispatch();
  const who = useSelector((state) => state.user.user.who);
  const gifticon = useSelector((state) => state.gifticon);

  const [reportModal, setReportModal] = useState(false);

  const handleReportButton = () => {
    setReportModal(true);
  };

  const handleReport = async (e) => {
    if (e.target.textContent === '네') {
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
    } else {
      setReportModal(false);
    }
  };
  return (
    <ReportButtonBox>
      {gifticon.status !== '사용함' && !gifticon.report && who === 2 && (
        <ReportButton
          className={`${gifticon.report === true && 'active'}`}
          onClick={handleReportButton}
        >
          신고 하기
        </ReportButton>
      )}
      {reportModal &&
        who === 2 &&
        !gifticon.report &&
        gifticon.status !== '사용함' && (
          <ModalV2
            title={'정말로 신고하시겠어요?'}
            subtitle={'신고하시면 기프티콘은 다시 사용하실 수 없습니다.'}
            callback={handleReport}
          />
        )}
    </ReportButtonBox>
  );
};

export default GifticonReport;
