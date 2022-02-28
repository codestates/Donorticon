import { useRef } from 'react';
import {
  ModalBackground,
  ModalFrame,
  Title,
  SubTitle,
} from '../../styles/Modal/ModalStyle';
import { Btn, ButtonContainer } from '../../styles/Modal/ButtonModalStyle';

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
