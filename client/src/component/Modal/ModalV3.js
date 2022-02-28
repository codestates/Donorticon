import {
  ModalBackground,
  ModalFrame,
  Title,
  SubTitle,
} from '../../styles/utils/Modal';
import { Btn, ButtonContainer } from '../../styles/ButtonModalStyle';
import { useRef } from 'react';

const ModalV3 = ({ title, subtitle, closer }) => {
  const check = useRef();
  const background = useRef();

  const buttonCheck = (e) => {
    if (e.target === check.current || e.target === background.current) closer();
  };

  return (
    <ModalBackground ref={background} onClick={buttonCheck}>
      <ModalFrame>
        <Title>{title}</Title>
        <SubTitle>{subtitle && subtitle}</SubTitle>
        <ButtonContainer>
          <Btn ref={check} onClick={buttonCheck}>
            확인
          </Btn>
        </ButtonContainer>
      </ModalFrame>
    </ModalBackground>
  );
};

export default ModalV3;
