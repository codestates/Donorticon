import styled from 'styled-components';

export const Div = styled.div`
  padding: 20px 0;
`;

export const GifticonStatusButton = styled.button`
  width: 100%;
  padding: 10px 0;
  text-align: center;
  background-color: ${(props) =>
    props.text === '사용함'
      ? props.theme.color.main
      : props.text === '신고됨'
      ? props.theme.color.error
      : null};
  border: 1px solid
    ${(props) =>
      props.textStyle === 1 ? props.theme.color.main : props.theme.color.error};
`;
