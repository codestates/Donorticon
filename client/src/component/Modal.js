import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setIsModalOpen, utilSelector } from '../redux/util/utilSlice';

const ModalBackground = styled.div``;

const ModalContainer = styled.div``;

const ModalButton = styled.button`
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const Modal = ({ content, buttonList, nextPage, callback }) => {
  //buttonList = ['예', '아니오']
  const utilState = useSelector(utilSelector);
  // console.log(utilState);
  const dispatch = useDispatch();

  const handleChoiceButton = (e) => {
    console.log(e.target.textContent);
    dispatch(setIsModalOpen());
    if (callback) {
      dispatch(callback(e.target.textContent));
    }
    if (nextPage) {
      window.location.href = nextPage;
    }
  };

  return (
    <>
      {utilState.isModalOpen ? (
        <ModalBackground>
          <ModalContainer>{content}</ModalContainer>
          {buttonList.map((buttonContent, idx) => {
            return (
              <ModalButton key={idx} onClick={handleChoiceButton}>
                {buttonContent}
              </ModalButton>
            );
          })}
        </ModalBackground>
      ) : null}
    </>
  );
};

export default Modal;
