import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  height: 30rem;
  text-align: center;
  border-radius: 20px;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
`;

export const Wrapper = styled.div`
  margin: 1rem;
  width: 95%;
  height: 80%;
  border-radius: 20px;
  border: dashed grey;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.label`
  cursor: pointer;
  display: inline-block;
  padding: 6px 12px;
  color: grey;
  &:hover{
    color: black;
  }
`;

export const Button = styled.div`
  background-color: #fac711;
  margin: 1rem 2rem;
`;

export const ButtonSection = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const Img = styled.img`
  border-radius: 20px;
  height: 100%;
`;

export const DragNDropWrapper = styled.div`
  width: 100%;
  > div {
    margin: 1rem;
  }
`;

export const DragNDropContainer = styled.div`
`;