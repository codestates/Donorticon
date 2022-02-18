import { useState } from 'react';
import { ErrorMessage, Input } from '../styles/utils/Input';

const InputSet = ({
  title,
  inputPlaceHolder,
  callback,
  errorMessage,
  check,
  name,
}) => {
  const [isError, setIsError] = useState(false);
  const titleCheck = title === '비밀번호' ? 'password' : 'text';

  const handleInputContent = (e) => {
    setIsError(callback(e));
  };

  return (
    <>
      <Input
        name={name}
        type={titleCheck}
        name={name}
        placeholder={inputPlaceHolder}
        onChange={handleInputContent}
      />
      {check && isError ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </>
  );
};

export default InputSet;
