import styled from 'styled-components';

export const InputContainer = styled.div`
  padding-top: 40px;
`;

// giver 회원가입 & helper 회원가입 마지막 페이지에 사용
export const InputLabel = styled.div`
  font-size: 12px;
  text-align: left;
`;

export const InputBox = styled.div`
  padding: 10px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid #000;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::placeholder {
    font-size: 12px;
    color: ${({ theme }) => theme.color.lightGrey};
  }
  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  padding-top: 10px;
  color: ${({ theme }) => theme.color.error};
`;
