import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sha256 from 'js-sha256';
import { setSocialUser } from '../../redux/user/userSlice';
import InputSet from '../../component/InputComponent';
import { SignUpContainer } from '../../styles/SignUpStyle';
import {
  Container,
  SubContainer,
  SubTitle,
  Title,
} from '../../styles/utils/Container';
import { Button } from '../../styles/utils/Button';
import { InputBox, InputContainer, InputLabel } from '../../styles/utils/Input';

const SignUpGiver = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCheckStart, setIsCheckStart] = useState(false);
  const [giverInfo, setGiverInfo] = useState({
    email: '',
    name: '',
    password: '',
    mobile: '',
  });
  const [isValid, setIsValid] = useState([false, false, false, false, true]);
  const [errorMessage, setErrorMessage] = useState('');
  const input = [
    {
      title: '이메일',
      inputPlaceHolder: '이메일을 입력해주세요',
      callback: (e) => {
        setGiverInfo(Object.assign(giverInfo, { email: e.target.value }));
        const form = new RegExp(
          '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
        );
        const validList = [...isValid];
        validList[0] = form.test(e.target.value);
        setIsValid(validList);
        return !form.test(e.target.value);
      },
      errorMessage: '이메일 형식이 맞지 않습니다',
    },
    {
      title: '이름',
      inputPlaceHolder: '8자 이내로 입력해주세요',
      callback: (e) => {
        setGiverInfo(Object.assign(giverInfo, { name: e.target.value }));
        const validList = [...isValid];
        validList[1] = e.target.value.length <= 8;
        setIsValid(validList);
        return !(e.target.value.length <= 8);
      },
      errorMessage: '8자 이상의 이름입니다',
    },
    {
      title: '비밀번호',
      inputPlaceHolder: '비밀번호를 입력해주세요',
      callback: (e) => {
        setGiverInfo(
          Object.assign(giverInfo, { password: sha256(e.target.value) }),
        );
        const validList = [...isValid];
        validList[2] = e.target.value.length >= 1;
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
        validList[3] = sha256(e.target.value) === giverInfo.password;
        setIsValid(validList);
        return sha256(e.target.value) !== giverInfo.password;
      },
      errorMessage: '비밀번호가 일치하지 않습니다',
    },
    {
      title: '휴대전화',
      inputPlaceHolder: '010-0000-0000 형식으로 입력해주세요',
      callback: (e) => {
        setGiverInfo(Object.assign(giverInfo, { mobile: e.target.value }));
        const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
        const validList = [...isValid];
        validList[4] = e.target.value ? form.test(e.target.value) : true;
        setIsValid(validList);
        return e.target.value ? !form.test(e.target.value) : false;
      },
      errorMessage: '전화번호 형식이 맞지 않습니다',
    },
  ];

  const handleSingUpButton = async () => {
    setIsCheckStart(isValid.includes(false));
    if (!isValid.includes(false)) {
      try {
        const result = await axios.post('/signup/giver', giverInfo);
        if (result) {
          const userInfo = {
            email: giverInfo.email,
            name: giverInfo.name,
            type: 1,
            id: result.data.id,
          };
          dispatch(setSocialUser(userInfo));
          await axios.get(`${process.env.REACT_APP_SERVER}/verification`, {
            headers: userInfo,
          });
          navigate(`../../verification`);
        }
      } catch (e) {
        if (e.response.status === 409) {
          setErrorMessage('이미 회원가입 된 이메일입니다');
        } else if (e.response.status === 500) {
          setErrorMessage('다시 시도해주세요');
        } else if (e.response.status === 422) {
          setErrorMessage('입력 정보를 확인해 주세요');
        }
      }
    }
  };

  return (
    <Container>
      <SignUpContainer>
        <SubContainer>
          <Title>GIVER</Title>
          <SubTitle>회원가입</SubTitle>
        </SubContainer>
        <InputContainer>
          {input.map((card, idx) => (
            <InputBox key={idx}>
              <InputLabel>
                {card.title === '휴대전화' ? card.title : `${card.title} *`}
              </InputLabel>
              <InputSet
                title={card.title}
                inputPlaceHolder={card.inputPlaceHolder}
                callback={card.callback}
                errorMessage={card.errorMessage}
                check={isCheckStart}
              />
            </InputBox>
          ))}
        </InputContainer>
        <Button style={{ marginTop: '40px' }} onClick={handleSingUpButton}>
          회원 가입
        </Button>
      </SignUpContainer>
    </Container>
  );
};

export default SignUpGiver;
