import styled from 'styled-components';

export const LevelContainer = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

export const LevelTitle = styled.div`
  font-size: 20px;
  text-align: left;
  padding-bottom: 20px;
`;

export const LevelContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const LevelImageBox = styled.div`
  text-align: right;
  position: relative;
`;

export const LevelName = styled.div`
  font-size: 12px;
`;

export const LevelImage = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  position: absolute;
  right: 0;
  bottom: 20px;
`;

export const LevelBarBox = styled.div`
  padding: 10px 0;
`;
