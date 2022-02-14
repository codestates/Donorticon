import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Input from '../component/Input';
import {
  giverSelector,
  setGiverInfo,
  setStateInitialize,
} from '../redux/user/giverSlice';
import axios from 'axios';
import {
  initializeIsSignUpError,
  setIsSignUpError,
  utilSelector,
} from '../redux/util/utilSlice';

const Container = styled.div``;

const Title = styled.div``;

const SubTitle = styled.div``;

const ContentBox = styled.div`
  font-size: 15px;
`;

const SignUpButton = styled.button`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const SignUpGiver = () => {
  const [isOn, setIsOn] = useState(false);
  const dispatch = useDispatch();
  const utilState = useSelector(utilSelector);
  const giverState = useSelector(giverSelector);
  const input = [
    {
      title: '이메일',
      inputPlaceHolder: '이메일을 입력해주세요',
      callback: (e) => {
        const stateChanger = {};
        stateChanger['email'] = e.target.value;
        dispatch(setGiverInfo(stateChanger));
        const form = new RegExp(
          '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
        );
        const isError = !form.test(e.target.value);
        stateChanger['idx'] = 0;
        stateChanger['check'] = isError;
        dispatch(setIsSignUpError(stateChanger));
        return isError;
      },
      errorMessage: '이메일 형식이 맞지 않습니다',
    },
    {
      title: '이름',
      inputPlaceHolder: '8자 이내로 입력해주세요',
      callback: (e) => {
        const stateChanger = {};
        stateChanger['name'] = e.target.value;
        dispatch(setGiverInfo(stateChanger));
        const isError = !(e.target.value.length <= 8);
        stateChanger['idx'] = 1;
        stateChanger['check'] = isError;
        dispatch(setIsSignUpError(stateChanger));
        return !(e.target.value.length <= 8);
      },
      errorMessage: '8자 이상의 이름입니다',
    },
    {
      title: '비밀번호',
      inputPlaceHolder: '비밀번호를 입력해주세요',
      callback: (e) => {
        const stateChanger = {};
        stateChanger['password'] = e.target.value;
        dispatch(setGiverInfo(stateChanger));
        const isError = !(e.target.value.length >= 1);
        console.log(isError);
        stateChanger['idx'] = 2;
        stateChanger['check'] = isError;
        dispatch(setIsSignUpError(stateChanger));
      },
      errorMessage: '비밀번호를 입력해주세요',
    },
    {
      title: '비밀번호 확인',
      inputPlaceHolder: '비밀번호를 확인해주세요',
      callback: (e) => {
        const stateChanger = {};
        const isError = e.target.value !== giverState.password;
        stateChanger['idx'] = 3;
        stateChanger['check'] = isError;
        dispatch(setIsSignUpError(stateChanger));
        return e.target.value !== giverState.password;
      },
      errorMessage: '비밀번호가 일치하지 않습니다',
    },
    {
      title: '휴대전화',
      inputPlaceHolder: '010-0000-0000 형식으로 입력해주세요',
      callback: (e) => {
        const stateChanger = {};
        stateChanger['mobile'] = e.target.value;
        dispatch(setGiverInfo(stateChanger));
        const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
        const isError = e.target.value ? !form.test(e.target.value) : false;
        stateChanger['idx'] = 4;
        stateChanger['check'] = isError;
        dispatch(setIsSignUpError(stateChanger));
        return isError;
      },
      errorMessage: '전화번호 형식이 맞지 않습니다',
    },
  ];

  const handleSingUpButton = () => {
    // console.log(utilState.isSignUpError);
    const isError = utilState.isSignUpError.reduce((prev, cur) => prev || cur);
    // console.log(isError);
    setIsOn(isError);
    // console.log(giverState);
    if (!isError) {
      try {
        axios.post(`${process.env.REACT_APP_SERVER}/signup`, giverState);
      } catch (e) {
        // console.log(e);
      }
    }
    dispatch(initializeIsSignUpError());
    dispatch(setStateInitialize());
  };
  return (
    <Container>
      <Title>G I V E R</Title>
      <SubTitle>JOIN</SubTitle>
      <ContentBox>
        {input.map((card, idx) => (
          <Input
            key={idx}
            title={card.title}
            inputPlaceHolder={card.inputPlaceHolder}
            callback={card.callback}
            errorMessage={card.errorMessage}
            check={isOn}
          />
        ))}
        <SignUpButton onClick={handleSingUpButton}>회원 가입</SignUpButton>
      </ContentBox>
    </Container>
  );
};

export default SignUpGiver;
