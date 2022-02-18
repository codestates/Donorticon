import styled from 'styled-components';

export const SignUpContainer = styled.div`
  width: 450px;
  padding: 100px 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 80%;
    padding: 50px 0;
  }
`;

export const ContentContainer = styled.div`
  padding-top: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.color.progressBar};
`;

export const ContentTitle = styled.div`
  padding: 40px 0;
  font-weight: 500;
  font-size: 20px;
`;

// checkbox
export const CheckBoxContainer = styled.div`
  text-align: left;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.progressBar};
  border-bottom: none;
`;

export const Box = styled.div`
  position: relative;
`;

export const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  appearance: none;
  width: 15px;
  height: 15px;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  cursor: pointer;
  &:checked {
    border: none;
    background-color: ${({ theme }) => theme.color.main};
  }
`;

export const Label = styled.label`
  cursor: pointer;
  position: absolute;
  top: 4px;
  left: 30px;
  font-size: 14px;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

// button
export const ButtonContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const SignUpButton = styled.button`
  width: 45%;
  border: 1px solid ${({ theme }) => theme.color.main};
  background-color: ${({ theme }) => theme.color.main};
  cursor: pointer;
  padding: 10px 0;
  text-align: center;
  &:hover {
    background-color: #fff;
    background-color: ${({ theme }) => theme.color.main};
    transition: 0.5s;
  }
  &:hover:disabled {
    color: ${({ theme }) => theme.color.error};
    background-color: #fff;
    border: 1px solid ${({ theme }) => theme.color.error};
    transition: 0.5s;
  }
`;
