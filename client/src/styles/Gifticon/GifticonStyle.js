import styled from 'styled-components';
import { Container, SubContainer } from '../utils/Container';

export const GifticonContainer = styled(Container)``;

export const Div = styled.div`
  padding: 20px 0;
`;

export const GifticonStatusButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: ${(props) =>
    props.text === '사용함'
      ? props.theme.color.main
      : props.text === '신고함'
      ? props.theme.color.error
      : null};
  border: 1px solid
    ${(props) =>
      props.textStyle === 1 ? props.theme.color.main : props.theme.color.error};
`;

export const LevelContainer = styled(SubContainer)`
  width: 50%;
`;

export const LevelContents = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LevelImage = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

export const LevelName = styled.div``;
