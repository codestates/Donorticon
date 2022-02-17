import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Title,
  SubTitle,
  Content,
  Box,
  구분Button,
  InputBox,
  InputName,
  InputContent,
  InputChanger,
  ChangeButton,
  ProfileImg,
} from '../styles/Mypage';
import axios from 'axios';

const Mypage = () => {
  const who = useSelector((state) => state.user.user.who);
  const whoIs = who === 1 ? 'giver' : 'helper';
  // console.log(whoIs);
  const giverExmaple = {
    id: 1,
    email: 'hwlsgur1120@naver.com',
    name: '허진혁',
    mobile: '010-0000-0000',
    img: 'example',
  };
  const heleprExample = {
    id: 1,
    email: 'kimcoding@codestates.com',
    name: 'kimcoding',
    mobile: '010-1234-5678',
    img: 'https://getprofileimg.com/png',
    location: '경기도 성남시',
    vulnerable: ['아동/청소년', '어르신'],
    gifticonCategory: ['식품', '가전제품'],
    gallery: ['https://getimg.com/1/png', 'https://getimg.com/2/png'],
    description: '남녀노소 모두를 봉사합니다',
    slogan: '기부해주세요',
  };
  const [userInfo, setUserInfo] = useState({});
  const [isChanging, setIsChanging] = useState([
    // giver  helper
    false, // email  email
    false, // name   name
    false, // mobile mobile
    false, // null   slogan
    false, // null   description
    false, // null   location
    false, // null   gallery
    false, // null   vulnerable
    false, // null   gifticonCategory
  ]);
  const contentList = {
    giver: [
      {
        inputName: 'email',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: (e, idx, boolean) => {
          const form = new RegExp(
            '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
          );
          if (form.test(e.target.value)) {
            const arr = [...isChanging];
            arr[idx] = boolean;
            setIsChanging(arr);
          } else {
            console.log('email형식 안맞아');
          }
        },
      },
      {
        inputName: 'name',
        inputCallback: (e) => {
          handleInput(e);
        },
      },
      {
        inputName: 'mobile',
        inputCallback: (e) => {
          handleInput(e);
        },
      },
      // {
      //   inputName: 'img',
      //   inputCallback: (e) => {},
      // },
    ],
    helper: [
      {
        inputName: 'email',
        inputCallback: (e) => {
          handleInput(e);
        },
      },
      {
        inputName: 'name',
        inputCallback: (e) => {
          handleInput(e);
        },
      },
      {
        inputName: 'mobile',
        inputCallback: (e) => {
          handleInput(e);
        },
      },
      {
        inputName: 'slogan',
        inputCallback: (e) => {
          handleInput(e);
        },
      },
      {
        inputName: 'description',
        inputCallback: (e) => {
          handleInput(e);
        },
      },
      // {
      //   inputName: 'img',
      //   inputCallback: (e) => {
      //     console.log(e);
      //   },
      // },
      {
        inputName: 'location',
        inputCallback: (e) => {
          console.log(e);
        },
      },
      {
        inputName: 'gallery',
        inputCallback: (e) => {
          console.log(e);
        },
      },
      {
        inputName: 'vulnerable',
        inputCallback: (e) => {
          console.log(e);
        },
      },
      {
        inputName: 'gifticonCategory',
        inputCallback: (e) => {
          console.log(e);
        },
      },
    ],
  };
  useEffect(async () => {
    // const { data } = await axios.get('/mypage/user', {
    //   headers: localStorage.getItem('token'),
    // });
    // setUserInfo(data);
    if (whoIs === 'giver') {
      setUserInfo(giverExmaple);
    } else if (whoIs === 'helper') {
      setUserInfo(
        Object.assign(
          heleprExample,
          { vulnerable: '#' + heleprExample.vulnerable.join(' #') },
          { gifticonCategory: '#' + heleprExample.gifticonCategory.join(' #') },
        ),
      );
    }
  }, []);

  const handleInput = (e) => {
    setUserInfo(
      Object.assign(userInfo, {
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleFocus = (idx, boolean) => {
    const arr = [...isChanging];
    arr[idx] = boolean;
    setIsChanging(arr);
  };

  return (
    <Container>
      <Title>{whoIs === 'giver' ? 'GIVER' : 'HELPER'}</Title>
      <SubTitle>{userInfo.name}님 반가워요!</SubTitle>
      <Content>
        <Box
          style={{
            width: '15%',
          }}
        >
          <구분Button>[내용1 내용2]</구분Button>
        </Box>
        <Box
          style={{
            padding: '0 20px',
            width: '60%',
          }}
        >
          {contentList[whoIs].map((list, idx) => (
            <InputBox key={idx}>
              <InputName>{list.inputName}</InputName>
              {isChanging[idx] ? (
                <InputChanger
                  name={list.inputName}
                  defaultValue={userInfo[list.inputName]}
                  onChange={list.inputCallback}
                  onBlur={(e) => list.blurCallback(e, idx, false)}
                />
              ) : (
                <InputContent
                  name={list.inputName}
                  onClick={() => handleFocus(idx, true)}
                >
                  {userInfo[list.inputName]}
                </InputContent>
              )}
            </InputBox>
          ))}
          <div>비밀번호 변경</div>
          <div>회원 탈퇴</div>
        </Box>
        <Box
          style={{
            width: '15%',
          }}
        >
          <ProfileImg />
          <ChangeButton>이미지 변경</ChangeButton>
        </Box>
      </Content>
    </Container>
  );
};

export default Mypage;
