import styled from 'styled-components';

export const SignUpContainer = styled.div`
  width: 400px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  padding-top: 40px;
`;

export const ContentTitle = styled.div`
  padding: 40px 0;
  font-weight: 500;
  font-size: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;

export const ContentBox = styled.div`
  min-height: 400px;
  border-top: ${(props) =>
    props.line && `1px solid ${props.theme.color.progressBar}`};
`;

// checkbox
export const CheckBoxContainer = styled.div`
  text-align: left;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.progressBar};
  border-top: none;
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
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

// button
export const ButtonContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
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
`;
