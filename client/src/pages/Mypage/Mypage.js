import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../redux/utils/auth';
import { signOut } from '../../redux/user/userSlice';
import AddressFinder from '../../component/SignUp/AddressFinder';
import Tag from '../../component/Mypage/Tag';
import SideBar from '../../component/SideBar';
import PassswordModal from '../../component/Modal/PasswordModal';
import ModalV2 from '../../component/Modal/ModalV2';
import {
  InputBox,
  InputName,
  InputContent,
  InputChanger,
  ProfileImg,
  GalleryImg,
  ActButton,
  ContentLeft,
  ContentRight,
  GalleryBox,
  NotShow,
  GalleryAddLabel,
  MultiContainer,
} from '../../styles/Mypage/MypageStyle';
import {
  BottomContainer,
  CommonContainer,
  ContentContainer,
  TopContainer,
} from '../../styles/CommonStyle';
import { SubTitle, Title } from '../../styles/utils/Container';

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
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    1: [
      {
        inputName: 'email',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: () => {
          //nothing to change
        },
      },
      {
        inputName: 'name',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: async (e, idx, boolean) => {
          if (e.target.value.length <= 8) {
            handleFocus(e);
            try {
              const result = await axios.put(
                '/mypage/giver',
                { name: userInfo.name },
                { headers: { Authorization: `Bearer ${token}` } },
              );
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
                { headers: { Authorization: `Bearer ${token}` } },
              );
              setIsChanging(arr);
            } catch (e) {}
          } else {
            console.log('휴대전화 번호');
          }
        },
      },
    ],
    2: [
      {
        inputName: 'email',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: () => {
          //nothing to change
        },
      },
      {
        inputName: 'name',
        inputCallback: (e) => {
          handleInput(e);
        },
        blurCallback: async (e, idx, boolean) => {
          if (e.target.value.length <= 8) {
            handleFocus(e);
            try {
              const result = await axios.put(
                '/mypage/helper',
                { name: userInfo.name },
                { headers: { Authorization: `Bearer ${token}` } },
              );
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
        blurCallback: async (e) => {
          const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
          if (form.test(e.target.value)) {
            handleFocus(e);
            try {
              const result = await axios.put(
                '/mypage/helper',
                { mobile: userInfo.mobile },
                { headers: { Authorization: `Bearer ${token}` } },
              );
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
        blurCallback: async (e) => {
          handleFocus(e);
          try {
            const result = await axios.put(
              '/mypage/helper',
              { slogan: userInfo.slogan },
              { headers: { Authorization: `Bearer ${token}` } },
            );
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
        blurCallback: async (e) => {
          handleFocus(e);
          try {
            const result = await axios.put(
              '/mypage/helper',
              { description: userInfo.description },
              { headers: { Authorization: `Bearer ${token}` } },
            );
          } catch (e) {
            console.log(e);
          }
        },
      },
    ],
  };

  useEffect(async () => {
    if (who === 1) {
      try {
        const { data } = await axios.get('/mypage/giver', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(data);
      } catch (e) {
        console.log(e);
      }
    } else if (who === 2) {
      try {
        const { data } = await axios.get('/mypage/helper', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(data);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

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
        data: { url },
      } = await axios.put(
        `/mypage/${whoIs}`,
        { tag },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(url);
      await axios.put(url, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    const index = parseInt(e.target.id);
    if (index !== 0) {
      const arr = [...isChanging];
      arr[index] = !isChanging[index];
      setIsChanging(arr);
    }
  };
  return (
    <CommonContainer>
      <TopContainer>
        <Title>{who === 1 ? 'GIVER' : 'HELPER'}</Title>
        {/* TODO: 모바일에서 출력 두줄로 해야함 */}
        <SubTitle>{userInfo.name}님 반가워요!</SubTitle>
      </TopContainer>
      <BottomContainer>
        <SideBar />
        <ContentContainer mypage>
          <ContentLeft>
            {inputList[who].map((list, idx) => (
              <InputBox key={idx}>
                <InputName>{list.inputName}</InputName>
                {isChanging[idx] ? (
                  <InputChanger
                    id={idx}
                    name={list.inputName}
                    defaultValue={userInfo[list.inputName]}
                    onChange={list.inputCallback}
                    onBlur={(e) => list.blurCallback(e)}
                  />
                ) : (
                  <InputContent id={idx} onClick={handleFocus}>
                    {userInfo[list.inputName]}
                  </InputContent>
                )}
              </InputBox>
            ))}
            {who === 2 && (
              <>
                <AddressFinder
                  callback={(address) => {
                    setUserInfo({ ...userInfo, location: address });
                    axios.put(
                      '/mypage/helper',
                      { address: address },
                      { headers: { Authorization: `Bearer ${token}` } },
                    );
                  }}
                  location={userInfo.location}
                  mypage
                />
                <MultiContainer>
                  <InputName>갤러리</InputName>
                  <GalleryBox>
                    {userInfo.gallery.map((url, idx) => {
                      return <GalleryImg key={idx} src={url} />;
                    })}
                  </GalleryBox>
                  <GalleryAddLabel htmlFor="imageAdder">
                    <NotShow
                      id="imageAdder"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'gallery')}
                    />
                    이미지 추가
                  </GalleryAddLabel>
                </MultiContainer>
                <MultiContainer>
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
                          { headers: { Authorization: `Bearer ${token}` } },
                        );
                      },
                      delete: async (id) => {
                        setUserInfo({
                          ...userInfo,
                          vulnerable: userInfo.vulnerable.filter(
                            (el) => el !== id,
                          ),
                        });
                        await axios.delete('/mypage/vulnerable', {
                          headers: { Authorization: `Bearer ${token}` },
                          params: { vulnerable_id: id },
                        });
                      },
                    }}
                  />
                </MultiContainer>
                <MultiContainer>
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
                          { headers: { Authorization: `Bearer ${token}` } },
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
                          headers: { Authorization: `Bearer ${token}` },
                          params: { gifticon_id: id },
                        });
                      },
                    }}
                  />
                </MultiContainer>
                <ActButton id="7" onClick={handleFocus}>
                  {userInfo.activity ? `계정 비활성화` : '계정 활성화'}
                </ActButton>
                {isChanging[7] ? (
                  <ModalV2
                    id="7"
                    title={
                      userInfo.activity
                        ? '계정을 비활성화 하시겠어요?'
                        : '계정을 활성화 하시겠어요?'
                    }
                    subtitle={
                      userInfo.activity ? '언제든 돌아오세요!' : '환영합니다'
                    }
                    callback={async (e) => {
                      handleFocus(e);
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
                              headers: { Authorization: `Bearer ${token}` },
                            },
                          );
                        } catch (e) {}
                      }
                    }}
                  />
                ) : null}
              </>
            )}
            <ActButton id="8" onClick={handleFocus}>
              비밀번호 변경
            </ActButton>
            {isChanging[8] && (
              <PassswordModal id="8" modalCloser={handleFocus} />
            )}
            <ActButton id="9" onClick={handleFocus}>
              회원 탈퇴
            </ActButton>
            {isChanging[9] && (
              <ModalV2
                id="9"
                title="정말로 탈퇴하시겠어요?"
                callback={async (e) => {
                  handleFocus(e);
                  if (e.target.textContent === '네') {
                    try {
                      await axios.delete('mypage/delete', {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      navigate('/');
                      dispatch(signOut());
                      removeToken();
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              />
            )}
          </ContentLeft>
          <ContentRight>
            <ProfileImg src={userInfo.img} />
            <GalleryAddLabel htmlFor="imageChanger">
              <NotShow
                id="imageChanger"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'img')}
              />
              이미지 변경
            </GalleryAddLabel>
          </ContentRight>
        </ContentContainer>
      </BottomContainer>
    </CommonContainer>
  );
};

export default Mypage;
