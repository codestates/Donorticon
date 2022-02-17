import { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../styles/utils/Input';

const ContentTitle = styled.div`
  margin-top: 5%;
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  text-align: center;
  color: red;
`;

const InputSet = ({
  title,
  inputPlaceHolder,
  callback,
  errorMessage,
  check,
}) => {
  const [isError, setIsError] = useState(false);

  const handleInputContent = (e) => {
    setIsError(callback(e));
  };

  return (
    <>
      <ContentTitle>{title}</ContentTitle>
      <Input
        type={title.includes('비밀번호') ? 'password' : 'text'}
        placeholder={inputPlaceHolder}
        onChange={handleInputContent}
      />
      {check && isError ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </>
  );
};

export default InputSet;
