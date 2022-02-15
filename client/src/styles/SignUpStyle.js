import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

export const Title = styled.div``;

export const SubTitle = styled.div``;

export const ContentGuider = styled.div``;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 500px;
  text-align: center;
  margin: 0 auto;
`;

export const ButtonContainer = styled.div`
  flex: 1, 0, 0;
  display: flex;
  margin: 0 auto;
`;

export const SignUpButton = styled.button`
  flex: 1, 1, 1;
  border: 1px solid ${({ theme }) => theme.color.main};
  cursor: pointer;
  padding: 10px 0;
  margin: 10px 10px;
  text-align: center;
  &:hover {
    background: #fff;
    background-color: ${({ theme }) => theme.color.main};
    transition: 0.7s;
  }
`;
export const CheckList = styled.div``;

export const Input = styled.input``;

export const Label = styled.label``;
