import styled from 'styled-components';

export const GifticonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div`
  padding: 20px 0;
`;

export const GifticonButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: ${(props) =>
    props.text === '사용함' ? props.theme.color.main : null};
  border: 1px solid
    ${(props) =>
      props.textStyle === 1 ? props.theme.color.main : props.theme.color.error};
`;
