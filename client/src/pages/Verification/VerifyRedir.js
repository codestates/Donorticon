import { useState, useEffect } from 'react';
import { updateVerification } from '../../redux/user/userThunk';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  VeriButton,
  VeriContainer,
  WelcomeText,
} from '../../styles/Verification/VerificationStyle';
import ButtonModal from '../../component/Modal/ButtonModal';
import Loader from '../../component/Loader';

const VerifyRedir = () => {
  const dispatch = useDispatch();
  const [verification, setVerification] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const url = window.location.pathname.split('/');
  const type = url[2].split('=')[1];
  const id = url[3].split('=')[1];
  const code = url[4].split('=')[1];

  const info = {
    type: type,
    id: id,
    code: code,
  };

  const handleModal = () => {
    setIsSignInOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await dispatch(updateVerification(info));
      const verified = unwrapResult(response);
      if (verified) {
        setVerification(true);
      }
    };
    setTimeout(() => {
      getData();
    }, 100);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <VeriContainer>
      {isLoading && <Loader />}
      {!isLoading && verification && (
        <>
          <WelcomeText>이메일 인증 완료 ✅</WelcomeText>
          <VeriButton onClick={handleModal}>로그인 하러 가기</VeriButton>
        </>
      )}
      {!isLoading && !verification && (
        <>
          <WelcomeText>이메일 인증이 진행중 입니다.</WelcomeText>
          <WelcomeText small>조금만 기다려 주세요 🙏🏻</WelcomeText>
        </>
      )}
      {isSignInOpen && (
        <ButtonModal
          giverText={'GIVER 로그인'}
          helperText={'HELPER 로그인'}
          setIsSignInOpen={setIsSignInOpen}
          isSignInOpen={isSignInOpen}
        />
      )}
    </VeriContainer>
  );
};

export default VerifyRedir;
