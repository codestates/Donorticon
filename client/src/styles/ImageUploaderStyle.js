import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  height: auto;
  text-align: center;
  border-radius: 20px;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  background-color: white;
  z-index: 100;
`;

export const ImgWrapper = styled.div`
  margin: 1rem;
  width: 95%;
  height: 20rem;
  border-radius: 20px;
  border: dashed grey;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

export const TxtWrapper = styled.div`
  margin: 1rem;
  width: 95%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  > div {
    position: relative;
    
  }
`;

export const InputImg = styled.input`
  display: none;
`;

export const InputText = styled.input`
  border-radius: 20px;
  height: 8rem;
  font-size: 2rem;
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
  padding: 0.5rem;
  font-size: 2rem;
  margin: 1rem 2rem;
  border-radius: 20px;
  cursor: pointer;

  &.disabled{
    opacity: 0.7;
    cursor: default;
  };
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

export const DragNDropSpace = styled.div`
  width: 100%;
`;