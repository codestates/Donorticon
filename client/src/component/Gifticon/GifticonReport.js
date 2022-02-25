import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ReportButton,
  ReportButtonBox,
} from '../../styles/Gifticon/GifticonReportStyle';
import GifticonReportModal from './GifticonReportModal';

const GifticonReport = () => {
  const who = useSelector((state) => state.user.user.who);
  const status = useSelector((state) => state.gifticon.status);
  const report = useSelector((state) => state.gifticon.report);

  const [reportModal, setReportModal] = useState(false);
  const handleReportButton = () => {
    setReportModal(true);
  };
  return (
    <ReportButtonBox>
      {status !== '사용함' && !report && who === 2 && (
        <ReportButton
          className={`${report === true && 'active'}`}
          onClick={handleReportButton}
        >
          신고 하기
        </ReportButton>
      )}
      {reportModal && who === 2 && !report && status !== '사용함' && (
        <GifticonReportModal
          reportModal={reportModal}
          setReportModal={setReportModal}
        />
      )}
    </ReportButtonBox>
  );
};

export default GifticonReport;
