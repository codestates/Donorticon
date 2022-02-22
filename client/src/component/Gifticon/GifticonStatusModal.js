import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../../redux/gifticon/gifticonSlice';
import { ModalBackground } from '../../styles/utils/Modal';
import {
  ModalButton,
  ModalButtonContainer,
  StatusModalFrame,
} from '../../styles/Gifticon/GifticonDetailStyle';

const btnList = [
  { id: 1, name: '사용함' },
  { id: 2, name: '수락함' },
  { id: 3, name: '확인중' },
  { id: 4, name: '거절됨' },
  { id: 5, name: '만료됨' },
];

const GifticonStatusModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const gifticon = useSelector((state) => state.gifticon);

  const token = localStorage.getItem('token');
  const printList = btnList.filter((x) => x.name !== gifticon.status);

  const handleButton = async (e) => {
    const btnText = e.target.innerText;
    try {
      const {
        data: { updated },
      } = await axios.put(
        `/gifticon/detail/${gifticon.id}`,
        {
          status: btnText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (updated.status === 'used') {
        dispatch(setInfo({ ...gifticon, status: '사용함', textStyle: 1 }));
      }
      if (updated.status === 'accepted') {
        dispatch(setInfo({ ...gifticon, status: '수락함', textStyle: 1 }));
      }
      if (updated.status === 'checking') {
        dispatch(setInfo({ ...gifticon, status: '확인중', textStyle: 1 }));
      }
      if (updated.status === 'rejected') {
        dispatch(setInfo({ ...gifticon, status: '거절됨', textStyle: 2 }));
      }
      if (updated.status === 'expired') {
        dispatch(setInfo({ ...gifticon, status: '만료됨', textStyle: 2 }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalBackground onClick={handleModal}>
      <StatusModalFrame>
        <ModalButtonContainer>
          {printList.map((x) => (
            <ModalButton key={x.id} onClick={handleButton}>
              {x.name}
            </ModalButton>
          ))}
        </ModalButtonContainer>
      </StatusModalFrame>
    </ModalBackground>
  );
};

export default GifticonStatusModal;
