import { useState, useRef } from 'react';
import axios from 'axios';
import InputSet from '../InputComponent';
import { sha256 } from 'js-sha256';
import { ErrorMessage } from '../../styles/utils/Input';
import { InputLabel, InputBox } from '../../styles/utils/Input';
import { ModalBackground, ModalFrame } from '../../styles/Modal/ModalStyle';
import { Btn, ButtonContainer } from '../../styles/Modal/ButtonModalStyle';

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
        setPasswordChanger({
          ...passwordChanger,
          [e.target.name]: sha256(e.target.value),
        });
      },
    },
    {
      title: '새로운 비밀번호',
      inputPlaceHolder: '새로운 비밀번호를 입력하세요',
      name: 'newPassword',
      callback: (e) => {
        setPasswordChanger({
          ...passwordChanger,
          [e.target.name]: sha256(e.target.value),
        });
      },
    },
    {
      title: '새로운 비밀번호 확인',
      inputPlaceHolder: '다시 한 번 새로운 비밀번호를 입력하세요',
      name: 'newPasswordCheck',
      callback: (e) => {
        setPasswordChanger({
          ...passwordChanger,
          [e.target.name]: sha256(e.target.value),
        });
      },
    },
  ];

  return (
    <ModalBackground
      id="8"
      ref={close}
      onClick={(e) => {
        if (close.current === e.target) {
          modalCloser(e);
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
            id="8"
            onClick={async (e) => {
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
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          'token',
                        )}`,
                      },
                    },
                  );
                  modalCloser(e);
                } catch (e) {
                  if (e.response.status === 422) {
                    setErrorMessage('모두 입력해주세요');
                  } else if (e.response.status === 401) {
                    setErrorMessage('현재 비밀번호가 일치하지 않습니다');
                  }
                }
              } else {
                setErrorMessage('새로운 비밀번호를 확인해주세요');
              }
            }}
          >
            확인
          </Btn>
          <Btn id="8" onClick={modalCloser}>
            취소
          </Btn>
        </ButtonContainer>
      </ModalFrame>
    </ModalBackground>
  );
};

export default PasswordModal;
