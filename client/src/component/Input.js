import { useState } from 'react';
import styled from 'styled-components';

const ContentTitle = styled.div``;

const ContentInput = styled.input``;

export const ErrorMessage = styled.div``;

const Input = ({ title, inputPlaceHolder, callback, errorMessage, check }) => {
  const [isError, setIsError] = useState(false);

  const handleInputContent = (e) => {
    setIsError(callback(e));
  };

  return (
    <>
      <ContentTitle>{title}</ContentTitle>
      <ContentInput
        type={title.includes('비밀번호') ? 'password' : 'text'}
        placeholder={inputPlaceHolder}
        onChange={handleInputContent}
      />
      {check && isError ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </>
  );
};

export default Input;
