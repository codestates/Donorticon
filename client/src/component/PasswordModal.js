import { useState, useRef } from 'react';
import { ModalBackground, ModalFrame } from '../styles/utils/Modal';
import { Btn, ButtonContainer } from '../styles/ButtonModalStyle';
import InputSet from './InputComponent';
import { ErrorMessage } from '../styles/utils/Input';
import axios from 'axios';
import { InputLabel, InputBox } from '../styles/utils/Input';

const PasswordModal = ({ modalCloser }) => {
  const [passwordChanger, setPasswordChanger] = useState({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const close = useRef();
  const inputList = [
    {
      title: '현재 비밀번호',
      inputPlaceHolder: '현재 비밀번호를 입력하세요',
      name: 'password',
      callback: (e) => {
        setPasswordChanger(
          Object.assign(
            { ...passwordChanger },
            { [e.target.name]: e.target.value },
          ),
        );
      },
    },
    {
      title: '새로운 비밀번호',
      inputPlaceHolder: '새로운 비밀번호를 입력하세요',
      name: 'newPassword',
      callback: (e) => {
        setPasswordChanger(
          Object.assign(
            { ...passwordChanger },
            { [e.target.name]: e.target.value },
          ),
        );
      },
    },
    {
      title: '새로운 비밀번호 확인',
      inputPlaceHolder: '다시 한 번 새로운 비밀번호를 입력하세요',
      name: 'newPasswordCheck',
      callback: (e) => {
        setPasswordChanger(
          Object.assign(
            { ...passwordChanger },
            { [e.target.name]: e.target.value },
          ),
        );
      },
    },
  ];

  return (
    <ModalBackground
      ref={close}
      onClick={(e) => {
        if (close.current === e.target) {
          modalCloser();
        }
      }}
    >
      <ModalFrame>
        {inputList.map((list, idx) => (
          <InputBox key={idx}>
            <InputLabel>{list.title}</InputLabel>
            <InputSet
              title={list.title}
              name={list.name}
              inputPlaceHolder={list.inputPlaceHolder}
              callback={list.callback}
            />
          </InputBox>
        ))}
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <ButtonContainer>
          <Btn
            onClick={async () => {
              if (passwordChanger.password === passwordChanger.newPassword) {
                setErrorMessage('현재 비밀번호와 새로운 비밀번호가 같습니다');
                return;
              }

              if (
                passwordChanger.newPassword === passwordChanger.newPasswordCheck
              ) {
                try {
                  await axios.put(
                    'mypage/password',
                    {
                      currentPassword: passwordChanger.password,
                      newPassword: passwordChanger.newPassword,
                    },
                    {
                      headers: { token: localStorage.getItem('token') },
                    },
                  );
                  modalCloser();
                } catch (e) {
                  if (e.response.status === 422) {
                    setErrorMessage('현재 비밀번호가를 확인해 주세요');
                  } else if (e.response.status === 401) {
                    setErrorMessage('세션이 만료되었습니다. 다시 시도해주세요');
                  }
                }
              } else {
                setErrorMessage('새로운 비밀번호를 확인해주세요');
              }
            }}
          >
            확인
          </Btn>
          <Btn
            onClick={() => {
              modalCloser();
            }}
          >
            취소
          </Btn>
        </ButtonContainer>
      </ModalFrame>
    </ModalBackground>
  );
};

export default PasswordModal;
