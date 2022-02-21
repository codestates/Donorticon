import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Title,
  SubTitle,
  Content,
  Box,
  PageButton,
  InputBox,
  InputName,
  InputContent,
  InputChanger,
  ChangeButton,
  ProfileImg,
} from '../../styles/Mypage';
import Tag from '../../component/Tag';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const vulnerableList = [
  '아동/청소년',
  '어르신',
  '장애인',
  '다문화',
  '가족/여성',
  '정신질환자',
  '그 외',
];

const gifticonList = [
  '식품',
  '화장품',
  '임신/출산/유아동',
  '디지털/가전',
  '의류',
  '리빙/주방/꽃',
  '레저/스포츠',
  '상품권/영화/도서',
];

const Mypage = () => {
  const navigate = useNavigate();
  const who = useSelector((state) => state.user.user.who);
  const whoIs = who === 1 ? 'giver' : 'helper';
  // console.log(whoIs);
  // const giverExmaple = {
  //   id: 1,
  //   email: 'hwlsgur1120@naver.com',
  //   name: '허진혁',
  //   mobile: '010-0000-0000',
  //   img: 'https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png',
  // };
  const heleprExample = {
    id: 1,
    email: 'kimcoding@codestates.com',
    name: 'kimcoding',
    mobile: '010-1234-5678',
    img: 'https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png',
    location: '경기도 성남시',
    vulnerable: [1, 2],
    gifticonCategory: [1, 4],
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
  ]);
  const inputList = {
    giver: [
      {
        inputName: 'email',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: async (e, idx, boolean) => {
          const form = new RegExp(
            '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
          );
          if (form.test(e.target.value)) {
            const arr = [...isChanging];
            arr[idx] = boolean;
            try {
              await axios.put(
                '/mypage/giver',
                { email: userInfo.email },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
            } catch (e) {
              console.log(e);
            }
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
        blurCallback: async (e, idx, boolean) => {
          if (e.target.value.length <= 8) {
            const arr = [...isChanging];
            arr[idx] = boolean;
            try {
              await axios.put(
                '/mypage/giver',
                { name: userInfo.name },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
            } catch (e) {}
          } else {
            console.log('name 8자 넘어');
          }
        },
      },
      {
        inputName: 'mobile',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: async (e, idx, boolean) => {
          const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
          if (form.test(e.target.value)) {
            const arr = [...isChanging];
            arr[idx] = boolean;
            try {
              await axios.put(
                '/mypage/giver',
                { mobile: userInfo.mobile },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
            } catch (e) {}
          } else {
            console.log('휴대전화 번호');
          }
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
        blurCallback: (e, idx, boolean) => {
          if (e.target.value.length <= 8) {
            const arr = [...isChanging];
            arr[idx] = boolean;
            setIsChanging(arr);
          } else {
            console.log('name 8자 넘어');
          }
        },
      },
      {
        inputName: 'mobile',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: (e, idx, boolean) => {
          const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
          if (form.test(e.target.value)) {
            const arr = [...isChanging];
            arr[idx] = boolean;
            setIsChanging(arr);
          } else {
            console.log('휴대전화 번호');
          }
        },
      },
      {
        inputName: 'slogan',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: (e, idx, boolean) => {
          const arr = [...isChanging];
          arr[idx] = boolean;
          setIsChanging(arr);
        },
      },
      {
        inputName: 'description',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: (e, idx, boolean) => {
          const arr = [...isChanging];
          arr[idx] = boolean;
          setIsChanging(arr);
        },
      },
      // {
      //   inputName: 'img',
      //   inputCallback: (e) => {
      //     console.log(e);
      //   },
      // },
      // {
      //   inputName: 'location',
      //   inputCallback: (e) => {
      //     console.log(e);
      //   },
      // },
      // {
      //   inputName: 'gallery',
      //   inputCallback: (e) => {
      //     console.log(e);
      //   },
      // },
      // {
      //   inputName: 'vulnerable',
      //   inputCallback: (e) => {
      //     console.log(e);
      //   },
      // },
      // {
      //   inputName: 'gifticonCategory',
      //   inputCallback: (e) => {
      //     console.log(e);
      //   },
      // },
    ],
  };
  useEffect(async () => {
    // const { data } = await axios.get('/mypage/user', {
    //   headers: localStorage.getItem('token'),
    // });
    // setUserInfo(data);
    if (whoIs === 'giver') {
      try {
        const { data } = await axios.get('/mypage/giver', {
          headers: { token: localStorage.getItem('token') },
        });
        setUserInfo(data);
      } catch (e) {
        console.log(e);
      }
    } else if (whoIs === 'helper') {
      try {
        // const { data } = await axios.get('/mypage/helper', {
        //   headers: { token: localStorage.getItem('token') },
        // });
        const data = heleprExample;
        setUserInfo(
          Object.assign(
            data,
            // { vulnerable: '#' + data.vulnerable.join(' #') },
            // {
            //   gifticonCategory: '#' + data.gifticonCategory.join(' #'),
            // },
          ),
        );
      } catch (e) {
        console.log(e);
      }
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
          <PageButton onClick={() => navigate('/mypage')}>내 프로필</PageButton>
          <PageButton onClick={() => navigate('/gifticon')}>
            {whoIs === 'giver' ? '기부 내역' : '기부받은 내역'}
          </PageButton>
        </Box>
        <Box
          style={{
            padding: '0 20px',
            width: '60%',
          }}
        >
          {inputList[whoIs].map((list, idx) => (
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
          {whoIs === 'helper' ? (
            <>
              <InputName>vulnerable</InputName>
              <Tag
                tagList={vulnerableList}
                targetTagList={userInfo.vulnerable}
                callback={{
                  create: (who) => {
                    setUserInfo(
                      Object.assign(
                        { ...userInfo },
                        {
                          vulnerable: [...userInfo.vulnerable, who],
                        },
                      ),
                    );
                  },
                  delete: (who) => {
                    setUserInfo(
                      Object.assign(
                        { ...userInfo },
                        {
                          vulnerable: userInfo.vulnerable.filter(
                            (el) => el !== who,
                          ),
                        },
                      ),
                    );
                  },
                }}
                // isEditMode={isChanging[7]}
              />
              <InputName>gifticon</InputName>
              <Tag
                tagList={gifticonList}
                targetTagList={userInfo.gifticonCategory}
                callback={() => null}
              />
            </>
          ) : null}
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
