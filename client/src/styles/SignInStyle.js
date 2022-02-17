import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.main};
  font-size: 30px;
`;

export const SubTitle = styled.div`
  margin-top: 10%;
`;

export const ContentBox = styled.div`
  border-top: solid;
  border-top-color: ${({ theme }) => theme.color.main};
  align-items: center;
  margin: 10% 0;
  padding: 10% 0;
`;
