import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDownSquare } from 'react-icons/ai';
import {
  DropdownItemContainer,
  DropDownItems,
  DropDownStatusButton,
  StatusContainer,
} from '../../styles/StatusDropDownStyle';
import { GifticonStatusButton } from '../../styles/Gifticon/GifticonStyle';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import axios from 'axios';
import { getToken } from '../../redux/utils/auth';
import ModalV2 from '../ModalV2';

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
  const token = getToken();

  const handleActive = () => {
    if (status !== '신고됨' || !isUsed) {
      setIsActive((prev) => !prev);
    }
  };

  const handleStatus = async (e) => {
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
    if (e.target.textContent === '네') {
      dispatch(setInfo({ ...gifticon, status: '거절됨', textStyle: 2 }));
      const message = textMessage ? textMessage : '';
      try {
        const response = await axios.post(
          `/gifticon/detail/${gifticonId}`,
          {
            message,
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
          isMessage={true}
          callback={handleRejected}
        />
      )}
      {isUsed && (
        <ModalV2
          title={
            '"사용함" 상태로 변경하시면, 추후 상태 변경은 절대 불가합니다.'
          }
          subtitle={'신중하게 선택해 주세요.'}
          callback={handleUsed}
        />
      )}
    </>
  );
};

export default StatusDropDown;
