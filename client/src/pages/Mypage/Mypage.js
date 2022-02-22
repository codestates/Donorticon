import { Suspense, useEffect, useState } from 'react';
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
  GalleryImgContainer,
  GalleryImg,
  Label,
} from '../../styles/Mypage';
import Tag from '../../component/Tag';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddressFinder from '../../component/AddressFinder';

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
  const [profileUrl, setProfileUrl] = useState(
    'https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png',
  );
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
  const [isEditProfile, setIsEditProfile] = useState(false);
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
        blurCallback: async (e, idx, boolean) => {
          const form = new RegExp(
            '^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$',
          );
          if (form.test(e.target.value)) {
            const arr = [...isChanging];
            arr[idx] = boolean;
            try {
              await axios.put(
                '/mypage/helper',
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
                '/mypage/helper',
                { name: userInfo.name },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
            } catch (e) {
              console.log(e);
            }
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
                '/mypage/helper',
                { mobile: userInfo.mobile },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
            } catch (e) {
              console.log(e);
            }
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
        blurCallback: async (e, idx, boolean) => {
          const arr = [...isChanging];
          arr[idx] = boolean;
          try {
            await axios.put(
              '/mypage/helper',
              { slogan: userInfo.slogan },
              { headers: { token: localStorage.getItem('token') } },
            );
            setIsChanging(arr);
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        inputName: 'description',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: async (e, idx, boolean) => {
          const arr = [...isChanging];
          arr[idx] = boolean;
          try {
            await axios.put(
              '/mypage/helper',
              { description: userInfo.description },
              { headers: { token: localStorage.getItem('token') } },
            );
            setIsChanging(arr);
          } catch (e) {
            console.log(e);
          }
        },
      },
      // {
      //   inputName: 'img',
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
        const { data } = await axios.get('/mypage/helper', {
          headers: { token: localStorage.getItem('token') },
        });
        setUserInfo(
          Object.assign(
            { ...data },
            {
              gallery: Array(2).fill(
                'http://img.segye.com/content/image/2021/04/11/20210411509865.jpg',
              ),
            },
          ),
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const handleImageUpload = async (e, tag) => {
    const file = e.target.files[0];
    const tempUrl = URL.createObjectURL(file);
    if (tag === 'img') {
      setUserInfo(Object.assign({ ...userInfo }, { [tag]: tempUrl }));
    } else if (tag === 'gallery') {
      setUserInfo(
        Object.assign(
          { ...userInfo },
          { [tag]: [...userInfo.gallery, tempUrl] },
        ),
      );
    }
    try {
      const s3Url = await axios.put(
        `/mypage/${whoIs}`,
        { tag },
        {
          headers: { token: localStorage.getItem('token') },
        },
      );
      await axios.put(s3Url, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (e) {
      console.log(e);
    }
  };

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
          <PageButton onClick={() => navigate('/gifticon?page=1&limit=9')}>
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
              <AddressFinder
                callback={(address) => {
                  setUserInfo(
                    Object.assign(
                      { ...userInfo },
                      {
                        location: address,
                      },
                    ),
                  );
                  axios.put(
                    '/mypage/helper',
                    { address: address },
                    { headers: { token: localStorage.getItem('token') } },
                  );
                }}
                location={userInfo.location}
              />
              <InputName>gallery</InputName>
              <GalleryImgContainer>
                {userInfo.gallery.map((url, idx) => {
                  return <GalleryImg key={idx} src={url} />;
                })}
              </GalleryImgContainer>
              <Label htmlFor="imageAdder">
                <ChangeButton
                  id="imageAdder"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'gallery')}
                />
                이미지 추가
              </Label>
              <InputName>vulnerable</InputName>
              <Tag
                tagList={vulnerableList}
                targetTagList={userInfo.vulnerable}
                callback={{
                  create: async (id) => {
                    setUserInfo(
                      Object.assign(
                        { ...userInfo },
                        {
                          vulnerable: [...userInfo.vulnerable, id],
                        },
                      ),
                    );
                    await axios.post(
                      '/mypage/vulnerable',
                      { vulnerable_id: id },
                      { headers: { token: localStorage.getItem('token') } },
                    );
                  },
                  delete: async (id) => {
                    setUserInfo(
                      Object.assign(
                        { ...userInfo },
                        {
                          vulnerable: userInfo.vulnerable.filter(
                            (el) => el !== id,
                          ),
                        },
                      ),
                    );
                    await axios.delete(
                      '/mypage/vulnerable',
                      { vulnerable_id: id },
                      { headers: { token: localStorage.getItem('token') } },
                    );
                  },
                }}
                // isEditMode={isChanging[7]}
              />
              <InputName>gifticon</InputName>
              <Tag
                tagList={gifticonList}
                targetTagList={userInfo.gifticonCategory}
                callback={{
                  create: async (id) => {
                    setUserInfo(
                      Object.assign(
                        { ...userInfo },
                        {
                          gifticonCategory: [...userInfo.gifticonCategory, id],
                        },
                      ),
                    );
                    await axios.post(
                      '/mypage/gifticon',
                      { gifticon_id: id },
                      { headers: { token: localStorage.getItem('token') } },
                    );
                  },
                  delete: async (id) => {
                    setUserInfo(
                      Object.assign(
                        { ...userInfo },
                        {
                          gifticonCategory: userInfo.gifticonCategory.filter(
                            (el) => el !== id,
                          ),
                        },
                      ),
                    );
                    await axios.delete(
                      '/mypage/gifticon',
                      { gifticon_id: id },
                      { headers: { token: localStorage.getItem('token') } },
                    );
                  },
                }}
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
          <ProfileImg src={userInfo.img} />
          <Label htmlFor="imageChanger">
            <ChangeButton
              id="imageChanger"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'img')}
            />
            이미지 변경
          </Label>
        </Box>
      </Content>
    </Container>
  );
};

export default Mypage;
