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

const SignUpHelper = () => {
  const [percent, setPercent] = useState(0);
  const [page, setPage] = useState(0);
  const signUpForm = [
    {
      contentGuide: '어떤 분들을 돕고 계신가요?',
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
      list: [],
    },
  ];
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
  return (
    <Container>
      <ContentBox>
        <Title>H E L P E R</Title>
        <ProgressBar percent={percent} />
        <ContentGuider>{signUpForm[page].contentGuide}</ContentGuider>
        {signUpForm[page].lists
          ? signUpForm[page].lists.map((list, idx, arr) => (
              <CheckList key={idx}>
                <Input value={list} type={'checkbox'} />
                <Label>{list}</Label>
              </CheckList>
            ))
          : null}
        <ButtonContainer>
          <SignUpButton onClick={handleButton}>이전</SignUpButton>
          <SignUpButton onClick={handleButton}>다음</SignUpButton>
        </ButtonContainer>
      </ContentBox>
    </Container>
  );
};

export default SignUpHelper;
