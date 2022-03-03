import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../redux/user/userThunk';
import {
  VeriContainer,
  WelcomeText,
  VeriButton,
  WelcomeDescription,
} from '../../styles/Verification/VerificationStyle';

const Verification = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.user);
  const userInfo = {
    email: state.email,
    type: state.who,
    id: state.id,
  };
  const handleVerification = () => {
    // const request = await axios.get(
    //   `${process.env.REACT_APP_SERVER}/verification`,
    //   { headers: headers },
    // );
    dispatch(verifyUser(userInfo));
  };

  return (
    <VeriContainer>
      <WelcomeText>Donorticon 회원이 되신 것을 환영합니다 😊</WelcomeText>
      <WelcomeText small>이메일 인증을 위한 메일이 발송되었습니다.</WelcomeText>
      <WelcomeDescription>
        가입하신 메일 주소의 메일함을 확인해주세요.
      </WelcomeDescription>
      <WelcomeDescription>
        인증 메일을 받지 못하셨다면 아래의 버튼을 눌러주세요!
      </WelcomeDescription>
      <VeriButton onClick={handleVerification}>인증 메일 다시 요청</VeriButton>
    </VeriContainer>
  );
};

export default Verification;
