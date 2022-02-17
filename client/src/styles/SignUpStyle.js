import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 10%;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.main};
  font-size: 30px;
  letter-spacing: 15px;
  margin: 0 auto;
`;

export const SubTitle = styled.div`
  font-size: 20px;
  letter-spacing: 15px;
  margin: 3% auto;
`;

export const ContentGuider = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
`;

export const ContentBox = styled.div`
  width: 50%;
  height: 500px;
  margin: 0 auto;
  border-top: solid;
  border-top-color: ${({ theme }) => theme.color.main};
`;

export const ButtonContainer = styled.div`
  flex: 1, 0, 0;
  display: flex;
  margin: 0 auto;
`;

export const SignUpButton = styled.button`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.main};
  cursor: pointer;
  padding: 10px 0;
  text-align: center;
  &:hover {
    background: #fff;
    background-color: ${({ theme }) => theme.color.main};
    transition: 0.7s;
  }
  &:disabled {
    color: red;
  }
`;
export const CheckList = styled.div`
  width: 50%;
  margin: 5% auto;
`;

export const Input = styled.input``;

export const Label = styled.label`
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;
