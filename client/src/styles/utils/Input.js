import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding-bottom: 0.8em;
  margin: 0.8em 0em;
  font-size: 1.15rem;
  border: none;
  border-bottom: 1px solid
    ${(props) => (props.error ? 'red' : props.theme.grey)};
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::placeholder {
    font-size: 0.8rem;
    color: ${(props) => props.theme.grey};
  }
  &:focus {
    outline: none;
  }
`;
