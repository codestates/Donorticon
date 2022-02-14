import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../styles/utils/Button';

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  height: 50%;
  padding: 10px;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const ButtonModal = ({ giverText, helperText, page, setIsOpen }) => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    setIsOpen(false);
    navigate('/signin');
  };

  return (
    <ModalBackground>
      <ButtonContainer>
        <Button onClick={page === 'signin' ? handleSignIn : null}>
          {giverText}
        </Button>
        <Button onClick={page === 'signin' ? handleSignIn : null}>
          {helperText}
        </Button>
      </ButtonContainer>
    </ModalBackground>
  );
};

export default ButtonModal;
