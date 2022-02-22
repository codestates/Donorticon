import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* width: 80%;
  margin: 5% auto;
  text-align: center;
  align-items: center; */
`;

export const Title = styled.div``;

export const SubTitle = styled.div``;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
`;

export const Box = styled.div``;

export const PageButton = styled.div`
  width: 45%;
  margin: 5%auto;
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

export const InputBox = styled.div`
  padding: 10px 0;
`;

export const InputName = styled.div``;

export const InputContent = styled.div`
  width: 50%;
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: inset;
  border-bottom: 1p;
`;

export const InputChanger = styled.input`
  width: 50%;
  padding: 10px 0;
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid #000;
  ::placeholder {
    font-size: 12px;
    color: ${({ theme }) => theme.color.lightGrey};
  }
  &:focus {
    outline: none;
  }
`;

export const ChangeButton = styled.input`
  display: none;
`;

export const ProfileImg = styled.img`
  width: 70%;
  border-radius: 50%;
`;

export const Label = styled.label`
  width: 45%;
  display: inline-block;
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
