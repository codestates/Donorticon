import { useState, useRef } from 'react';
import {
  ModalBackground,
  ModalFrame,
  Title,
  SubTitle,
  MesaageTitle,
  MessageArea,
  ButtonContainer,
  ModalButton,
} from '../../styles/Modal/ModalStyle';

const ModalV2 = ({ title, subtitle, isMessage, callback, id }) => {
  const [textMessage, setTextMessage] = useState('');
  const close = useRef();
  const background = useRef();

  const buttonYes = (e) => {
    if (isMessage) {
      callback(e, textMessage);
    } else {
      callback(e);
    }
  };

  const buttonNo = (e) => {
    if (e.target === close.current || e.target === background.current) {
      callback(e);
    }
  };

  return (
    <ModalBackground id={id ? id : 0} ref={background} onClick={buttonNo}>
      <ModalFrame>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
        {isMessage && (
          <>
            <MesaageTitle />
            <MessageArea onChange={(e) => setTextMessage(e.target.value)} />
          </>
        )}
        <ButtonContainer>
          <ModalButton onClick={buttonYes}>네</ModalButton>
          <ModalButton ref={close} onClick={buttonNo}>
            아니오
          </ModalButton>
        </ButtonContainer>
      </ModalFrame>
    </ModalBackground>
  );
};

export default ModalV2;
