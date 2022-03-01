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
  ActBox,
  TextareaChanger,
  LoaderBox,
  Explanation,
} from '../../styles/Mypage/MypageStyle';
import {
  BottomContainer,
  CommonContainer,
  ContentContainer,
  TopContainer,
} from '../../styles/CommonStyle';
import { SubTitle, Title } from '../../styles/utils/Container';
import { ErrorMessage } from '../../styles/utils/Input';
import Loader from '../../component/Loader';

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
    activity: true,
    img: '',
  });

  const [isChanging, setIsChanging] = useState([
    //        giver  helper
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
  //                                     email, name, mobile, slogan, description
  const [isError, setIsError] = useState([false, false, false, false, false]);

  const inputList = {
    1: [
      { title: '이메일', name: 'email', errorMessage: '' },
      { title: '이름', name: 'name', errorMessage: '8자 이상의 이름입니다' },
      {
        title: '휴대전화',
        name: 'mobile',
        errorMessage: '010-0000-0000 형식으로 입력해주세요',
      },
    ],
    2: [
      { title: '이메일', name: 'email', errorMessage: '' },
      {
        title: '이름/단체명',
        name: 'name',
        errorMessage: '8자 이상의 이름입니다',
      },
      {
        title: '휴대전화',
        name: 'mobile',
        errorMessage: '010-0000-0000 형식으로 입력해주세요',
      },
      { title: '슬로건', name: 'slogan', errorMessage: '' },
      {
        title: '설명',
        name: 'description',
        errorMessage: '300자 이상의 내용입니다',
      },
    ],
  };

  const vulnerableHandler = {
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
        vulnerable: userInfo.vulnerable.filter((el) => el !== id),
      });
      await axios.delete('/mypage/vulnerable', {
        headers: { Authorization: `Bearer ${token}` },
        params: { vulnerable_id: id },
      });
    },
  };

  const gifticonHandler = {
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
        gifticonCategory: userInfo.gifticonCategory.filter((el) => el !== id),
      });
      await axios.delete('/mypage/gifticon', {
        headers: { Authorization: `Bearer ${token}` },
        params: { gifticon_id: id },
      });
    },
  };

  const checkForm = (e) => {
    if (e.target.name === 'name') {
      return e.target.value.length <= 8 && e.target.value.length >= 1;
    } else if (e.target.name === 'mobile') {
      const form = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
      return form.test(e.target.value);
    } else if (e.target.name === 'description') {
      return e.target.value.length >= 1 && e.target.value.length <= 300;
    } else {
      return e.target.value.length >= 1;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const tempUrl = URL.createObjectURL(file);
    if (e.target.id === 'img') {
      setUserInfo({ ...userInfo, img: tempUrl });
    } else if (e.target.id === 'gallery') {
      if (userInfo.gallery.length === 5) {
        return;
      }
      setUserInfo({ ...userInfo, gallery: [...userInfo.gallery, tempUrl] });
    }
    try {
      const {
        data: { url },
      } = await axios.put(
        `${who === 1 ? '/mypage/giver' : '/mypage/helper'}`,
        { tag: e.target.id },
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

  const handleBlur = async (e) => {
    if (checkForm(e)) {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
      handleFocus(e);
      handleError(e, false);
      try {
        await axios.put(
          `${who === 1 ? '/mypage/giver' : '/mypage/helper'}`,
          { [e.target.name]: e.target.value },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      handleError(e, true);
    }
  };

  const handleError = (e, boolean) => {
    const arr = [...isError];
    arr[e.target.id] = boolean;
    setIsError(arr);
  };

  const handleFocus = (e) => {
    if (e.target.id !== '0') {
      const arr = [...isChanging];
      arr[e.target.id] = !isChanging[e.target.id];
      setIsChanging(arr);
    }
  };

  const handleAddress = (address) => {
    setUserInfo({ ...userInfo, location: address });
    axios.put(
      '/mypage/helper',
      { address: address },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  };

  const removeGallery = (e) => {
    if (userInfo.gallery.length >= 2) {
      setUserInfo({
        ...userInfo,
        gallery: userInfo.gallery.filter((el) => el !== e.target.src),
      });
    } else {
      console.log('1개 이상 갤러리 이미지를 사용해주세요');
    }
  };

  const handleDeleteUser = async (e) => {
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
  };

  const handleActivity = async (e) => {
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
  };

  const handleWho = async () => {
    try {
      const { data } = await axios.get(
        `${who === 1 ? '/mypage/giver' : 'mypage/helper'}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      handleWho();
    }, 100);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <CommonContainer>
      <TopContainer>
        <Title>{who === 1 ? 'GIVER' : 'HELPER'}</Title>
        <SubTitle>{userInfo.name}님 반가워요!</SubTitle>
      </TopContainer>
      <BottomContainer>
        <SideBar />
        {isLoading ? (
          <LoaderBox>
            <Loader />
          </LoaderBox>
        ) : (
          <ContentContainer mypage>
            <ContentLeft>
              {inputList[who].map((list, idx) => (
                <InputBox key={idx}>
                  <InputName>{list.title}</InputName>
                  {isChanging[idx] ? (
                    idx === 4 ? (
                      <>
                        <TextareaChanger
                          id={idx}
                          name={list.name}
                          defaultValue={userInfo[list.name]}
                          onBlur={handleBlur}
                        />
                        {isError[idx] && (
                          <ErrorMessage>{list.errorMessage}</ErrorMessage>
                        )}
                      </>
                    ) : (
                      <>
                        <InputChanger
                          id={idx}
                          name={list.name}
                          defaultValue={userInfo[list.name]}
                          onBlur={handleBlur}
                        />
                        {isError[idx] && (
                          <ErrorMessage>{list.errorMessage}</ErrorMessage>
                        )}
                      </>
                    )
                  ) : (
                    <InputContent id={idx} onClick={handleFocus}>
                      {userInfo[list.name] && userInfo[list.name].length > 50
                        ? `${userInfo[list.name].slice(0, 50)}...`
                        : userInfo[list.name]}
                    </InputContent>
                  )}
                </InputBox>
              ))}
              {who === 2 && (
                <>
                  <AddressFinder
                    callback={handleAddress}
                    location={userInfo.location}
                    mypage
                  />
                  <MultiContainer gallery>
                    <InputName>사진 (최대 5개 등록가능)</InputName>
                    <Explanation>
                      사진 삭제: 사진 위에 마우스를 놓은 후 클릭
                    </Explanation>
                    <GalleryBox>
                      {userInfo.gallery.map((url, idx) => {
                        return (
                          <GalleryImg
                            key={idx}
                            src={url}
                            onClick={removeGallery}
                          />
                        );
                      })}
                    </GalleryBox>
                    <GalleryAddLabel htmlFor="gallery">
                      <NotShow
                        id="gallery"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      이미지 추가
                    </GalleryAddLabel>
                  </MultiContainer>
                  <MultiContainer>
                    <InputName>어떤 분들을 돕고 있나요</InputName>
                    <Tag
                      tagList={vulnerableList}
                      targetTagList={userInfo.vulnerable}
                      callback={vulnerableHandler}
                    />
                  </MultiContainer>
                  <MultiContainer>
                    <InputName>지원을 원하시는 기프티콘</InputName>
                    <Tag
                      tagList={gifticonList}
                      targetTagList={userInfo.gifticonCategory}
                      callback={gifticonHandler}
                    />
                  </MultiContainer>
                </>
              )}
              <ActBox>
                {who === 2 && (
                  <ActButton id="7" onClick={handleFocus}>
                    {userInfo.activity ? '계정 비활성화' : '계정 활성화'}
                  </ActButton>
                )}
                <ActButton id="8" onClick={handleFocus}>
                  비밀번호 변경
                </ActButton>
                <ActButton id="9" onClick={handleFocus}>
                  회원 탈퇴
                </ActButton>
              </ActBox>
              {isChanging[7] && (
                <ModalV2
                  id="7"
                  title={
                    userInfo.activity
                      ? '계정을 비활성화 하시겠어요?'
                      : '계정을 활성화 하시겠어요?'
                  }
                  subtitle={
                    userInfo.activity ? '언제든 돌아오세요!' : '환영합니다 🥳'
                  }
                  callback={handleActivity}
                />
              )}
              {isChanging[8] && (
                <PassswordModal id="8" modalCloser={handleFocus} />
              )}
              {isChanging[9] && (
                <ModalV2
                  id="9"
                  title="정말로 탈퇴하시겠어요?"
                  callback={handleDeleteUser}
                />
              )}
            </ContentLeft>
            <ContentRight>
              <MultiContainer center>
                <ProfileImg src={userInfo.img} />
              </MultiContainer>
              <MultiContainer center>
                <GalleryAddLabel center htmlFor="img">
                  <NotShow
                    id="img"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  이미지 변경
                </GalleryAddLabel>
              </MultiContainer>
            </ContentRight>
          </ContentContainer>
        )}
      </BottomContainer>
    </CommonContainer>
  );
};

export default Mypage;
