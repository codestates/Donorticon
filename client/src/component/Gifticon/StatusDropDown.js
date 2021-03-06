import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDownSquare } from 'react-icons/ai';
import { getTokenThunk, refreshTokenThunk } from '../../redux/utils/auth';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import ModalV2 from '../Modal/ModalV2';
import {
  DropdownItemContainer,
  DropDownItems,
  DropDownStatusButton,
  StatusContainer,
} from '../../styles/Gifticon/StatusDropDownStyle';
import { GifticonStatusButton } from '../../styles/Gifticon/GifticonStyle';
import noaccess from '../../img/noaccess.png';

const NOACCESS_IMG = noaccess;

const gifticonStatus = [
  { id: 1, name: '사용함' },
  { id: 2, name: '수락함' },
  { id: 3, name: '확인중' },
  { id: 4, name: '거절됨' },
  { id: 5, name: '만료됨' },
];

const StatusDropDown = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const gifticon = useSelector((state) => state.gifticon);
  const { id: helperId, who } = user;
  const { id: gifticonId, userId: giverId, status, textStyle } = gifticon;

  const [isActive, setIsActive] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isUsed, setIsUsed] = useState(false);

  const filtered = gifticonStatus.filter((x) => x.name !== status);

  const handleActive = () => {
    if (status !== '신고됨' || !isUsed) {
      setIsActive((prev) => !prev);
    }
  };

  const handleStatus = async (e) => {
    const token = localStorage.getItem('token');
    const updatedText = e.target.innerText;

    let statusName;

    if (updatedText === '사용함') {
      statusName = 'used';
    } else if (updatedText === '수락함') {
      statusName = 'accepted';
    } else if (updatedText === '확인중') {
      statusName = 'checking';
    } else if (updatedText === '거절됨') {
      statusName = 'rejected';
    } else if (updatedText === '만료됨') {
      statusName = 'expired';
    }

    try {
      const {
        data: { updated },
      } = await axios.put(
        `/gifticon/detail/${gifticonId}`,
        {
          status: statusName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (updated.status === 'used') {
        setIsUsed(true);
        return;
      }
      if (updated.status === 'accepted') {
        dispatch(setInfo({ ...gifticon, status: '수락함', textStyle: 1 }));
      }
      if (updated.status === 'checking') {
        dispatch(setInfo({ ...gifticon, status: '확인중', textStyle: 1 }));
      }
      if (updated.status === 'rejected') {
        setIsActive(false);
        setIsRejected(true);
        return;
      }
      if (updated.status === 'expired') {
        dispatch(setInfo({ ...gifticon, status: '만료됨', textStyle: 2 }));
      }

      setIsActive((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRejected = async (e, textMessage) => {
    const token = localStorage.getItem('token');
    if (e.target.textContent === '네') {
      dispatch(
        setInfo({
          ...gifticon,
          status: '거절됨',
          textStyle: 2,
          img: NOACCESS_IMG,
        }),
      );
      try {
        const response = await axios.post(
          `/gifticon/detail/${gifticonId}`,
          {
            message: textMessage,
            giverId,
            helperId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.status === 200) {
          setIsRejected(false);
          setIsActive(false);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsRejected(false);
    }
  };

  const handleUsed = async (e) => {
    if (e.target.textContent === '네') {
      dispatch(setInfo({ ...gifticon, status: '사용함', textStyle: 1 }));
      setIsUsed(false);
      setIsActive(false);
    } else {
      setIsUsed(false);
    }
  };
  const verifyingToken = async () => {
    try {
      const rest = await dispatch(getTokenThunk()).unwrap();
      if (rest < 60 * 10) {
        refreshToken();
      }
    } catch (e) {
      if (e.response.status === 401) {
        refreshToken();
      }
    }
  };

  const refreshToken = async () => {
    try {
      await dispatch(refreshTokenThunk()).unwrap();
    } catch (e) {
      if (e.response.status === 401) {
        console.log(e);
        // console.log('can not refresh');
      }
    }
  };
  useEffect(() => {
    verifyingToken();
  }, []);

  return (
    <>
      {who === 1 && (
        <GifticonStatusButton
          style={{
            cursor: 'not-allowed',
          }}
          text={status}
          textStyle={textStyle}
        >
          {status}
        </GifticonStatusButton>
      )}
      {who === 2 && (
        <StatusContainer>
          <DropDownStatusButton
            text={status}
            textStyle={textStyle}
            onClick={handleActive}
            status={status}
          >
            {status}
            <AiOutlineDownSquare size="20" className="icon" />
          </DropDownStatusButton>
          <DropDownItems isActive={isActive}>
            {filtered.map((status) => (
              <DropdownItemContainer key={status.id} onClick={handleStatus}>
                {status.name}
              </DropdownItemContainer>
            ))}
          </DropDownItems>
        </StatusContainer>
      )}
      {isRejected && (
        <ModalV2
          title={'정말로 거부하시겠어요?'}
          subtitle={'한번 거절하신 기프티콘은 다시 사용하실 수 없습니다.'}
          placeholder={'감사하지만 거절합니다'}
          isMessage={true}
          callback={handleRejected}
          noSpace={'no'}
        />
      )}
      {isUsed && (
        <ModalV2
          title={
            '"사용함" 상태로 변경하시면, 추후 상태 변경은 절대 불가합니다.'
          }
          subtitle={'"사용함"으로 변경하시겠어요?'}
          callback={handleUsed}
        />
      )}
    </>
  );
};

export default StatusDropDown;
