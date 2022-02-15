import { useEffect, useState } from 'react';
import ProgressBar from '../../component/ProgressBar';
import {
  Container,
  Title,
  ContentGuider,
  SubTitle,
  ContentBox,
  ButtonContainer,
  SignUpButton,
  Input,
  Label,
  CheckList,
} from '../../styles/SignUpStyle';
import { ErrorMessage } from '../../component/Input';
import sha256 from 'js-sha256';
import axios from 'axios';

const SignUpHelper = () => {
  const [helperInfo, setHeperInfo] = useState({
    vulunable: [],
    gifticon_category: [],
    location: '',
    email: '',
    name: '',
    password: '',
    mobile: '',
  });

  const [isValid, setIsValid] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    true,
  ]);
  const [percent, setPercent] = useState(0);
  const [page, setPage] = useState(0);
  const [buttonAble, setButtonAble] = useState(false);
  const signUpForm = [
    {
      contentGuide: '어떤 분들을 돕고 계신가요?',
      name: 'vulunable',
      lists: [
        '아동청소년',
        '어르신',
        '장애인',
        '다문화',
        '가족/여성',
        '정신질환자',
        '그 외',
      ],
    },
    {
      contentGuide: '무엇을 지원 받고 싶으신가요?',
      name: 'gifticon_category',
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
    },
    {
      contentGuide: '주요 활동지역을 알려주세요',
    },
    {
      contentGuide: '마지막으로 필수 정보를 입력해 주세요',
      // input: [
      //   {
      //     title: '이메일',
      //     inputPlaceHolder: '이메일을 입력해주세요',
      //     callback: (e) => {
      //       setGiverInfo(Object.assign(giverInfo, { email: e.target.value }));
      //       const form = new RegExp(
      //         '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
      //       );
      //       const validList = [...isValid];
      //       validList[0] = form.test(e.target.value);
      //       setIsValid(validList);
      //       return !form.test(e.target.value);
      //     },
      //     errorMessage: '이메일 형식이 맞지 않습니다',
      //   },
      //   {
      //     title: '이름',
      //     inputPlaceHolder: '8자 이내로 입력해주세요',
      //     callback: (e) => {
      //       setGiverInfo(Object.assign(giverInfo, { name: e.target.value }));
      //       const validList = [...isValid];
      //       validList[1] = e.target.value.length <= 8;
      //       setIsValid(validList);
      //       return !(e.target.value.length <= 8);
      //     },
      //     errorMessage: '8자 이상의 이름입니다',
      //   },
      //   {
      //     title: '비밀번호',
      //     inputPlaceHolder: '비밀번호를 입력해주세요',
      //     callback: (e) => {
      //       setGiverInfo(
      //         Object.assign(giverInfo, { password: sha256(e.target.value) }),
      //       );
      //       const validList = [...isValid];
      //       validList[2] = e.target.value.length >= 1;
      //       setIsValid(validList);
      //       return !(e.target.value.length >= 1);
      //     },
      //     errorMessage: '비밀번호를 입력해주세요',
      //   },
      //   {
      //     title: '비밀번호 확인',
      //     inputPlaceHolder: '비밀번호를 확인해주세요',
      //     callback: (e) => {
      //       const validList = [...isValid];
      //       validList[3] = sha256(e.target.value) === giverInfo.password;
      //       setIsValid(validList);
      //       return sha256(e.target.value) !== giverInfo.password;
      //     },
      //     errorMessage: '비밀번호가 일치하지 않습니다',
      //   },
      //   {
      //     title: '휴대전화',
      //     inputPlaceHolder: '010-0000-0000 형식으로 입력해주세요',
      //     callback: (e) => {
      //       setGiverInfo(Object.assign(giverInfo, { mobile: e.target.value }));
      //       const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
      //       const validList = [...isValid];
      //       validList[4] = e.target.value ? form.test(e.target.value) : true;
      //       setIsValid(validList);
      //       return e.target.value ? !form.test(e.target.value) : false;
      //     },
      //     errorMessage: '전화번호 형식이 맞지 않습니다',
      //   },
      // ],
    },
  ];

  const handleCheckBox = (e) => {
    console.log(buttonAble);
    if (e.target.checked) {
      setHeperInfo(
        Object.assign(helperInfo, {
          [e.target.name]: [...helperInfo[e.target.name], e.target.value],
        }),
      );
    } else {
      setHeperInfo(
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

  const handleButton = (e) => {
    if (e.target.textContent === '다음') {
      if (page <= 2) {
        setPercent(percent + 25);
        setPage(page + 1);
      }
    } else {
      if (page >= 1) {
        setPercent(percent - 25);
        setPage(page - 1);
      }
    }
  };

  useEffect(() => {
    setPercent(percent + 25);
  }, []);

  useEffect(() => {});

  return (
    <Container>
      <ContentBox>
        <Title>H E L P E R</Title>
        <ProgressBar percent={percent} />
        <ContentGuider>{signUpForm[page].contentGuide}</ContentGuider>
        {signUpForm[page].lists
          ? signUpForm[page].lists.map((list, idx) => (
              <CheckList key={page * 7 + idx}>
                <Input
                  name={signUpForm[page].name}
                  value={list}
                  type={'checkbox'}
                  onClick={handleCheckBox}
                  defaultChecked={helperInfo[signUpForm[page].name].includes(
                    list,
                  )}
                />
                <Label>{list}</Label>
              </CheckList>
            ))
          : null}
        <ButtonContainer>
          <SignUpButton onClick={handleButton} disabled={page === 0}>
            이전
          </SignUpButton>
          <SignUpButton onClick={handleButton} disabled={!buttonAble}>
            다음
          </SignUpButton>
        </ButtonContainer>
        <ErrorMessage>입력하세요</ErrorMessage>
      </ContentBox>
    </Container>
  );
};

export default SignUpHelper;
