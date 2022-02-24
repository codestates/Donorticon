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
  ActButton,
} from '../../styles/Mypage';
import Tag from '../../component/Tag';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddressFinder from '../../component/AddressFinder';
import PassswordModal from '../../component/PasswordModal';
import ModalV2 from '../../component/ModalV2';

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
  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: '',
    name: '',
    mobile: '',
    slogan: '',
    description: '',
    gifticonCategory: [],
    vulnerable: [],
    gallery: [],
    activity: false,
    img: '',
  });
  const [isChanging, setIsChanging] = useState([
    // giver  helper
    false, // email  email
    false, // name   name
    false, // mobile mobile
    false, // null   slogan
    false, // null   description
    false, // null   location
    false, // null   gallery
    false, // null   activity
    false, // password password
    false, // 회원 탈퇴
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
              const result = await axios.put(
                '/mypage/giver',
                { email: userInfo.email },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
              const { token } = result.data;
              console.log(token);
              localStorage.setItem('token', token);
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
              const result = await axios.put(
                '/mypage/giver',
                { name: userInfo.name },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
              const { token } = result.data;
              localStorage.setItem('token', token);
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
              const result = await axios.put(
                '/mypage/giver',
                { mobile: userInfo.mobile },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
              const { token } = result.data;
              localStorage.setItem('token', token);
            } catch (e) {}
          } else {
            console.log('휴대전화 번호');
          }
        },
      },
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
              const result = await axios.put(
                '/mypage/helper',
                { name: userInfo.name },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
              const { token } = result.data;
              localStorage.setItem('token', token);
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
              const result = await axios.put(
                '/mypage/helper',
                { mobile: userInfo.mobile },
                { headers: { token: localStorage.getItem('token') } },
              );
              setIsChanging(arr);
              const { token } = result.data;
              localStorage.setItem('token', token);
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
            const result = await axios.put(
              '/mypage/helper',
              { slogan: userInfo.slogan },
              { headers: { token: localStorage.getItem('token') } },
            );
            setIsChanging(arr);
            const { token } = result.data;
            localStorage.setItem('token', token);
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
            const result = await axios.put(
              '/mypage/helper',
              { description: userInfo.description },
              { headers: { token: localStorage.getItem('token') } },
            );
            setIsChanging(arr);
            const { token } = result.data;
            localStorage.setItem('token', token);
          } catch (e) {
            console.log(e);
          }
        },
      },
    ],
  };
  useEffect(async () => {
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
        // setUserInfo(data);
        console.log(data);
        setUserInfo({
          ...data,
          gallery: Array(2).fill(
            'http://img.segye.com/content/image/2021/04/11/20210411509865.jpg',
          ),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const modalController = (idx, boolean) => {
    const arr = [...isChanging];
    arr[idx] = boolean;
    setIsChanging(arr);
  };

  const handleImageUpload = async (e, tag) => {
    const file = e.target.files[0];
    const tempUrl = URL.createObjectURL(file);
    if (tag === 'img') {
      setUserInfo({ ...userInfo, [tag]: tempUrl });
    } else if (tag === 'gallery') {
      setUserInfo({ ...userInfo, [tag]: [...userInfo.gallery, tempUrl] });
    }
    try {
      const {
        data: { s3Url },
        data: { token },
      } = await axios.put(
        `/mypage/${whoIs}`,
        { tag },
        {
          headers: { token: localStorage.getItem('token') },
        },
      );
      localStorage.setItem('token', token);
      await axios.put(s3Url, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
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
                  setUserInfo({ ...userInfo, location: address });
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
                    setUserInfo({
                      ...userInfo,
                      vulnerable: [...userInfo.vulnerable, id],
                    });
                    await axios.post(
                      '/mypage/vulnerable',
                      { vulnerable_id: id },
                      { headers: { token: localStorage.getItem('token') } },
                    );
                  },
                  delete: async (id) => {
                    setUserInfo({
                      ...userInfo,
                      vulnerable: userInfo.vulnerable.filter((el) => el !== id),
                    });
                    await axios.delete('/mypage/vulnerable', {
                      headers: { token: localStorage.getItem('token') },
                      params: { vulnerable_id: id },
                    });
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
                    setUserInfo({
                      ...userInfo,
                      gifticonCategory: [...userInfo.gifticonCategory, id],
                    });
                    await axios.post(
                      '/mypage/gifticon',
                      { gifticon_id: id },
                      { headers: { token: localStorage.getItem('token') } },
                    );
                  },
                  delete: async (id) => {
                    setUserInfo({
                      ...userInfo,
                      gifticonCategory: userInfo.gifticonCategory.filter(
                        (el) => el !== id,
                      ),
                    });
                    await axios.delete('/mypage/gifticon', {
                      headers: { token: localStorage.getItem('token') },
                      params: { gifticon_id: id },
                    });
                  },
                }}
              />
              <ActButton
                onClick={() => {
                  modalController(7, true);
                }}
              >
                {userInfo.activity ? `계정 비활성화` : '계정 활성화'}
              </ActButton>
              {isChanging[7] ? (
                <ModalV2
                  title={
                    userInfo.activity
                      ? '계정을 비활성화 하시겠어요?'
                      : '계정을 활성화 하시겠어요?'
                  }
                  subtitle={
                    userInfo.activity ? '언제든 돌아오세요!' : '환영합니다'
                  }
                  callback={async (e) => {
                    if (e.target.textContent === '네') {
                      try {
                        setUserInfo({
                          ...userInfo,
                          activity: !userInfo.activity,
                        });
                        await axios.put(
                          'mypage/helper/activity',
                          { activity: !userInfo.activity },
                          {
                            headers: { token: localStorage.getItem('token') },
                          },
                        );
                      } catch (e) {}
                    }
                    modalController(7, false);
                  }}
                />
              ) : null}
            </>
          ) : null}
          <ActButton
            onClick={() => {
              modalController(8, true);
            }}
          >
            비밀번호 변경
          </ActButton>
          {isChanging[8] ? (
            <PassswordModal
              modalCloser={() => {
                modalController(8, false);
              }}
            />
          ) : null}
          <ActButton
            onClick={() => {
              modalController(9, true);
            }}
          >
            회원 탈퇴
          </ActButton>
          {isChanging[9] ? (
            <ModalV2
              title="정말로 탈퇴하시겠어요?"
              callback={async (e) => {
                if (e.target.textContent === '네') {
                  try {
                    await axios.delete('mypage/delete', {
                      headers: { token: localStorage.getItem('token') },
                    });
                    localStorage.removeItem('token');
                  } catch (e) {}
                }
                modalController(9, false);
              }}
            />
          ) : null}
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
