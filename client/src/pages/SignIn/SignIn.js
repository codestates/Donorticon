import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import sha256 from 'js-sha256';
import {
  signInGiver,
  signInGiverGuest,
  signInHelper,
  signInHelperGuest,
  verifyUser,
} from '../../redux/user/userThunk';
import { FcGoogle } from 'react-icons/fc';
import { FaComment } from 'react-icons/fa';
import InputSet from '../../component/InputComponent';
import Loader from '../../component/Loader';
import {
  ButtonContainer,
  SignInContainer,
  SocialBox,
  SocialIcon,
  SocialText,
} from '../../styles/SignInStyle';
import {
  Container,
  SubContainer,
  SubTitle,
  Title,
} from '../../styles/utils/Container';
import { Button } from '../../styles/utils/Button';
import { InputContainer, ErrorMessage } from '../../styles/utils/Input';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prev } = useSelector((state) => state.page);
  const who = useSelector((state) => state.user.user.who);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [delay, setDelay] = useState(false);

  const handleInput = (e) => {
    setUserInfo(
      Object.assign(userInfo, {
        [e.target.name]:
          e.target.name === 'password'
            ? sha256(e.target.value)
            : e.target.value,
      }),
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignin();
    }
  };

  const handleSignin = async () => {
    if (userInfo.email !== '' && userInfo.password !== '') {
      try {
        if (who === 1) {
          await dispatch(signInGiver(userInfo)).unwrap();
        } else if (who === 2) {
          await dispatch(signInHelper(userInfo)).unwrap();
        }
      } catch (e) {
        if (e.response.status === 401) {
          setDelay(true);
          const { id, email, type } = e.response.data;
          const veriInfo = { id, email, type };
          await dispatch(verifyUser(veriInfo));
          setDelay(false);
          navigate('/verification');
        }
        if (e.response.status === 404) {
          setErrorMessage('????????? ??? ??????????????? ?????? ??????????????????');
        }
      }
    } else {
      // console.log('inficient params');
      const form = new RegExp(
        '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
      );
      if (userInfo.email === '') {
        setErrorMessage('???????????? ??????????????????');
      } else if (!form.test(userInfo.email)) {
        setErrorMessage('????????? ????????? ???????????????');
      } else {
        setErrorMessage('??????????????? ???????????????');
      }
    }
  };

  const handleGuest = async () => {
    try {
      if (who === 1) {
        await dispatch(signInGiverGuest()).unwrap();
      } else if (who === 2) {
        await dispatch(signInHelperGuest()).unwrap();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGoogle = () => {
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
    window.location.assign(GOOGLE_LOGIN_URL);
  };

  const handleKakao = () => {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(KAKAO_LOGIN_URL);
  };

  return (
    <Container>
      {delay ? (
        <Loader />
      ) : (
        <SignInContainer>
          <SubContainer>
            <Title>{who === 1 ? 'GIVER' : 'HELPER'}</Title>
            <SubTitle>?????????</SubTitle>
          </SubContainer>
          <InputContainer>
            <InputSet
              title="?????????"
              name="email"
              inputPlaceHolder="?????????"
              callback={handleInput}
            />
            <InputSet
              title="????????????"
              name="password"
              inputPlaceHolder="????????????"
              callback={handleInput}
              handleKeyPress={handleKeyPress}
            />
            <ErrorMessage center>{errorMessage}</ErrorMessage>
          </InputContainer>
          <ButtonContainer>
            <Button onClick={handleSignin}>?????????</Button>
            <Button onClick={handleGuest}>??????????????????</Button>
            {who === 1 && (
              <>
                <SocialBox>
                  <div></div>
                  <div className="middle">
                    <SocialIcon>
                      <FcGoogle size="18" />
                    </SocialIcon>
                    <SocialText onClick={handleGoogle}>?????? ?????????</SocialText>
                  </div>
                  <div></div>
                </SocialBox>
                <SocialBox kakao>
                  <div></div>
                  <div className="middle">
                    <SocialIcon>
                      <FaComment size="15" color="#181600" />
                    </SocialIcon>
                    <SocialText onClick={handleKakao}>????????? ?????????</SocialText>
                  </div>
                  <div></div>
                </SocialBox>
              </>
            )}
          </ButtonContainer>
        </SignInContainer>
      )}
    </Container>
  );
};

export default SignIn;
