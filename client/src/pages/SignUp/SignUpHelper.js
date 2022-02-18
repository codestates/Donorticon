import { useEffect, useState } from 'react';
import ProgressBar from '../../component/ProgressBar';
import {
  Container,
  Title,
  SubTitle,
  ContentGuider,
  ContentBox,
  ButtonContainer,
  SignUpButton,
  Input,
  Label,
  CheckList,
} from '../../styles/SignUpStyle';
import { ErrorMessage } from '../../component/Input';
import InputSet from '../../component/Input';
import sha256 from 'js-sha256';
import axios from 'axios';
import Addresser from '../../component/AddressFinder';
import { useNavigate } from 'react-router-dom';
import { setSocialUser } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const SignUpHelper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [helperInfo, setHelperInfo] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    location: '',
    vulnerableName: [],
    gifticonCategoryName: [],
  });

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
      errorMessage: '최소 하나를 선택해 주세요',
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
      errorMessage: '최소 하나를 선택해 주세요',
    },
    {
      contentGuide: '주요 활동지역을 알려주세요',
      callback: (adress) => {
        setHelperInfo(Object.assign(helperInfo, { location: adress }));
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
            setHelperInfo(Object.assign(helperInfo, { email: e.target.value }));
            const form = new RegExp(
              '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
            );
            const validList = [...isValid];
            validList[3] = form.test(e.target.value);
            setIsValid(validList);
            return !form.test(e.target.value);
          },
          errorMessage: '이메일 형식이 맞지 않습니다',
        },
        {
          title: '이름',
          inputPlaceHolder: '8자 이내로 입력해주세요',
          callback: (e) => {
            setHelperInfo(Object.assign(helperInfo, { name: e.target.value }));
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
            setHelperInfo(
              Object.assign(helperInfo, { password: sha256(e.target.value) }),
            );
            const validList = [...isValid];
            validList[5] = e.target.value.length >= 1;
            setIsValid(validList);
            return !(e.target.value.length >= 1);
          },
          errorMessage: '비밀번호를 입력해주세요',
        },
        {
          title: '비밀번호 확인',
          inputPlaceHolder: '비밀번호를 확인해주세요',
          callback: (e) => {
            const validList = [...isValid];
            validList[6] = sha256(e.target.value) === helperInfo.password;
            setIsValid(validList);
            return sha256(e.target.value) !== helperInfo.password;
          },
          errorMessage: '비밀번호가 일치하지 않습니다',
        },
        {
          title: '휴대전화',
          inputPlaceHolder: '010-0000-0000 형식으로 입력해주세요',
          callback: (e) => {
            setHelperInfo(
              Object.assign(helperInfo, { mobile: e.target.value }),
            );
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

  const handleButton = async (e) => {
    console.log(helperInfo);
    if (e.target.textContent === '다음') {
      if (page <= 2) {
        setPercent(percent + 25);
        setPage(page + 1);
        setButtonAble(page === 2 ? true : isValid[page + 1]);
      }
    } else if (e.target.textContent === '이전') {
      if (page >= 1) {
        setPercent(percent - 25);
        setPage(page - 1);
        setButtonAble(isValid[page - 1]);
      }
    } else {
      console.log(isValid);
      setIsCheckStart(isValid.includes(false));
      if (!isValid.includes(false)) {
        try {
          const result = await axios.post('/signup/helper', helperInfo);
          console.log(result);
          if (result) {
            const userInfo = {
              email: helperInfo.email,
              name: helperInfo.name,
              type: 2,
              id: result.data.id,
            };
            dispatch(setSocialUser(userInfo));
            await axios.get(`${process.env.REACT_APP_SERVER}/verification`, {
              headers: userInfo,
            });
            navigate(`../../verification`);
          }
        } catch (e) {
          console.log('error');
          console.log(e);
        }
      }
    }
  };

  useEffect(() => {
    setPercent(percent + 25);
  }, []);

  return (
    <Container>
      <Title>HELPER</Title>
      <SubTitle>JOIN</SubTitle>
      <ContentBox>
        <ProgressBar percent={percent} />
        <ContentGuider>{signUpForm[page].contentGuide}</ContentGuider>
        {page < 2 ? (
          signUpForm[page].lists.map((list, idx) => (
            <CheckList key={page * 7 + idx}>
              <Input
                id={page * 7 + idx}
                name={signUpForm[page].name}
                value={list}
                type={'checkbox'}
                onClick={handleCheckBox}
                defaultChecked={helperInfo[signUpForm[page].name].includes(
                  list,
                )}
              />
              <Label htmlFor={page * 7 + idx}>{list}</Label>
            </CheckList>
          ))
        ) : page === 2 ? (
          <Addresser
            callback={signUpForm[2].callback}
            location={helperInfo.location}
          />
        ) : (
          signUpForm[page].input.map((card, idx) => (
            <InputSet
              key={idx}
              title={card.title}
              inputPlaceHolder={card.inputPlaceHolder}
              callback={card.callback}
              errorMessage={card.errorMessage}
              check={isCheckStart}
            />
          ))
        )}
        <ErrorMessage>
          {page < 3 && !isValid[page] ? signUpForm[page].errorMessage : ''}
        </ErrorMessage>
        <ButtonContainer>
          <SignUpButton onClick={handleButton} disabled={page === 0}>
            이전
          </SignUpButton>
          <SignUpButton onClick={handleButton} disabled={!buttonAble}>
            {page === 3 ? '가입하기' : '다음'}
          </SignUpButton>
        </ButtonContainer>
      </ContentBox>
    </Container>
  );
};

export default SignUpHelper;
