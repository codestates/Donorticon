import { useState } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from './styledComponents';

const ContentTitle = styled.div``;

const ContentInput = styled.input``;

const Input = ({ title, inputPlaceHolder, callback, errorMessage, check }) => {
  const [isError, setIsError] = useState(false);

  const handleInputContent = (e) => {
    setIsError(callback(e));
  };

  return (
    <>
      <ContentTitle>{title}</ContentTitle>
      <ContentInput
        placeholder={inputPlaceHolder}
        onChange={handleInputContent}
      />
      {check && isError ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </>
  );
};

export default Input;
