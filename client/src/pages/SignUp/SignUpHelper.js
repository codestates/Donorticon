import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import AddressFinder from '../../component/SignUp/AddressFinder';
import ProgressBar from '../../component/SignUp/ProgressBar';
import InputSet from '../../component/InputComponent';
import {
  ButtonContainer,
  CheckBoxContainer,
  SignUpButton,
  SignUpContainer,
  CheckBox,
  ContentContainer,
  ContentTitle,
  Label,
  Box,
  ContentBox,
} from '../../styles/SignUpStyle';
import {
  Container,
  SubContainer,
  SubTitle,
  Title,
} from '../../styles/utils/Container';
import {
  ErrorMessage,
  InputBox,
  InputContainer,
  InputLabel,
} from '../../styles/utils/Input';
import { signUpHelper, verifyUser } from '../../redux/user/userThunk';
import { unwrapResult } from '@reduxjs/toolkit';
import Loader from '../../component/Loader';

const SignUpHelper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { prev } = useSelector((state) => state.page);
  const [helperInfo, setHelperInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    mobile: '',
    location: '',
    vulnerableName: [],
    gifticonCategoryName: [],
  });

  const [errorMessage, setErrormessage] = useState('');

  const [isValid, setIsValid] = useState([
    false, // 도움이필요한 사람
    false, // 기프티콘
    false, // 주소
    false, // 이메일
    false, // 이름
    false, // 패스워드
    false, // 패스워드 확인
    true, // 모바일
  ]);
  const [percent, setPercent] = useState(0);
  const [page, setPage] = useState(0);
  const [buttonAble, setButtonAble] = useState(false);
  const [isCheckStart, setIsCheckStart] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [delay, setDelay] = useState(false);

  const signUpForm = [
    {
      contentGuide: '어떤 분들을 돕고 계신가요?',
      name: 'vulnerableName',
      lists: [
        '아동청소년',
        '어르신',
        '장애인',
        '다문화',
        '가족/여성',
        '정신질환자',
        '그 외',
      ],
      errorMessage: '1개 이상 선택해주세요',
    },
    {
      contentGuide: '무엇을 지원 받고 싶으신가요?',
      name: 'gifticonCategoryName',
      lists: [
        '식품',
        '화장품',
        '임신/출산/유아 용품',
        '디지털/가전',
        '의류',
        '리빙/주방/꽃',
        '레저/스포츠',
        '상품권/영화/도서',
      ],
      errorMessage: '1개 이상 선택해주세요',
    },
    {
      contentGuide: '주요 활동지역을 알려주세요',
      callback: (adress) => {
        setHelperInfo({ ...helperInfo, location: adress });
        const validList = [...isValid];
        validList[2] = true;
        setIsValid(validList);
        setButtonAble(true);
      },
      errorMessage: '주소를 입력해주세요',
    },
    {
      contentGuide: '마지막으로 필수 정보를 입력해 주세요',
      input: [
        {
          title: '이메일',
          inputPlaceHolder: '이메일을 입력해주세요',
          callback: (e) => {
            setHelperInfo({ ...helperInfo, email: e.target.value });
            const form = new RegExp(
              '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
            );
            const validList = [...isValid];
            validList[3] =
              form.test(e.target.value) && e.target.value.length <= 50;
            setIsValid(validList);
            return !(form.test(e.target.value) && e.target.value.length <= 50);
          },
          errorMessage: '이메일 형식이 맞지 않습니다',
        },
        {
          title: '이름',
          inputPlaceHolder: '8자 이내로 입력해주세요',
          callback: (e) => {
            setHelperInfo({ ...helperInfo, name: e.target.value });
            const validList = [...isValid];
            validList[4] = e.target.value.length <= 8;
            setIsValid(validList);
            return !(e.target.value.length <= 8);
          },
          errorMessage: '8자 이상의 이름입니다',
        },
        {
          title: '비밀번호',
          inputPlaceHolder: '비밀번호를 입력해주세요',
          callback: (e) => {
            setHelperInfo({ ...helperInfo, password: sha256(e.target.value) });
            const validList = [...isValid];
            validList[5] =
              e.target.value.length >= 1 &&
              sha256(e.target.value) === helperInfo.passwordCheck;
            setIsValid(validList);
            return !(
              e.target.value.length >= 1 &&
              sha256(e.target.value) === helperInfo.passwordCheck
            );
          },
          errorMessage: '비밀번호를 확인해주세요',
        },
        {
          title: '비밀번호 확인',
          inputPlaceHolder: '비밀번호를 확인해주세요',
          callback: (e) => {
            setHelperInfo({
              ...helperInfo,
              passwordCheck: sha256(e.target.value),
            });
            const validList = [...isValid];
            validList[6] = sha256(e.target.value) === helperInfo.password;
            if (validList[6] && !validList[5]) validList[5] = true;
            setIsValid(validList);
            return sha256(e.target.value) !== helperInfo.password;
          },
          errorMessage: '비밀번호가 일치하지 않습니다',
        },
        {
          title: '휴대전화',
          inputPlaceHolder: '010-0000-0000 형식으로 입력해주세요',
          callback: (e) => {
            setHelperInfo({ ...helperInfo, mobile: e.target.value });
            const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
            const validList = [...isValid];
            validList[7] = e.target.value ? form.test(e.target.value) : true;
            setIsValid(validList);
            return e.target.value ? !form.test(e.target.value) : false;
          },
          errorMessage: '전화번호 형식이 맞지 않습니다',
        },
      ],
    },
  ];

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setHelperInfo(
        Object.assign(helperInfo, {
          [e.target.name]: [...helperInfo[e.target.name], e.target.value],
        }),
      );
    } else {
      setHelperInfo(
        Object.assign(helperInfo, {
          [e.target.name]: [...helperInfo[e.target.name]].filter(
            (list) => list !== e.target.value,
          ),
        }),
      );
    }
    if (page < 2) {
      const validChange = [...isValid];
      if (helperInfo[e.target.name].length !== 0) {
        validChange[page] = true;
        setButtonAble(true);
      } else {
        setButtonAble(false);
        validChange[page] = false;
      }
      setIsValid(validChange);
    } else {
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      signUp();
    }
  };

  const signUp = async () => {
    setIsCheckStart(isValid.includes(false));
    try {
      const result = await dispatch(signUpHelper(helperInfo));
      const id = unwrapResult(result);
      setDelay(true);
      const userInfo = {
        email: helperInfo.email,
        name: helperInfo.name,
        type: 2,
        id,
      };
      await dispatch(verifyUser(userInfo));
      setDelay(false);
      navigate(`../../verification`);
    } catch (e) {
      if (e.status === 409) {
        setErrormessage('이미 회원가입 된 이메일입니다');
      } else if (e.status === 500) {
        setErrormessage('다시 시도해주세요');
      } else if (e.status === 422) {
        setErrormessage('입력 정보를 확인해 주세요');
      }
    }
  };

  const handleButton = async (e) => {
    if (e.target.textContent === '다음') {
      if (page <= 2) {
        setPercent(percent + 25);
        setPage(page + 1);
        setButtonAble(page === 2 ? true : isValid[page + 1]);
      }
    } else if (e.target.textContent === '이전') {
      if (page === 0) {
        if (prev.includes('verifyRedir')) {
          navigate('/');
        } else {
          navigate(prev);
        }
      } else if (page >= 1) {
        setPercent(percent - 25);
        setPage(page - 1);
        setButtonAble(isValid[page - 1]);
      }
    } else {
      signUp();
    }
  };

  useEffect(() => {
    if (percent === 0) {
      setPercent(percent + 25);
    }
  }, []);

  return (
    <Container>
      {delay ? (
        <Loader />
      ) : (
        <SignUpContainer>
          <SubContainer>
            <Title>HELPER</Title>
            <SubTitle>회원가입</SubTitle>
          </SubContainer>
          <ContentContainer>
            <ProgressBar percent={percent} />
            <ContentTitle>{signUpForm[page].contentGuide}</ContentTitle>
            {page < 2 ? (
              <ContentBox line>
                {signUpForm[page].lists.map((list, idx) => (
                  <CheckBoxContainer key={page * 7 + idx}>
                    <Box>
                      <CheckBox
                        key={page * 7 + idx}
                        id={page * 7 + idx}
                        name={signUpForm[page].name}
                        value={list}
                        onClick={handleCheckBox}
                        defaultChecked={helperInfo[
                          signUpForm[page].name
                        ].includes(list)}
                      />
                      <Label htmlFor={page * 7 + idx}>{list}</Label>
                    </Box>
                  </CheckBoxContainer>
                ))}
              </ContentBox>
            ) : page === 2 ? (
              <ContentBox>
                <AddressFinder
                  callback={signUpForm[2].callback}
                  location={helperInfo.location}
                />
              </ContentBox>
            ) : (
              <ContentBox>
                <InputContainer signup>
                  {signUpForm[page].input.map((card, idx) => (
                    <InputBox key={idx}>
                      <InputLabel>
                        {card.title === '휴대전화'
                          ? card.title
                          : `${card.title} *`}
                      </InputLabel>
                      <InputSet
                        key={idx}
                        title={card.title}
                        inputPlaceHolder={card.inputPlaceHolder}
                        callback={card.callback}
                        errorMessage={card.errorMessage}
                        check={isCheckStart}
                        handleKeyPress={handleKeyPress}
                      />
                    </InputBox>
                  ))}
                </InputContainer>
              </ContentBox>
            )}
          </ContentContainer>
          <ErrorMessage center style={{ paddingTop: '40px' }}>
            {page < 3 && !isValid[page] && displayError
              ? signUpForm[page].errorMessage
              : ''}
          </ErrorMessage>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <ButtonContainer>
            <SignUpButton onClick={handleButton}>이전</SignUpButton>
            <SignUpButton
              onClick={(e) => {
                if (buttonAble) {
                  handleButton(e);
                  setDisplayError(false);
                } else {
                  setDisplayError(true);
                }
              }}
              buttonAble
            >
              {page === 3 ? '가입하기' : '다음'}
            </SignUpButton>
          </ButtonContainer>
        </SignUpContainer>
      )}
    </Container>
  );
};

export default SignUpHelper;
