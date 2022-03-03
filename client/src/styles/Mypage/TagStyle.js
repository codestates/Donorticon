import styled from 'styled-components';

export const TagContainer = styled.div`
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const TagAdder = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TagBox = styled.div`
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.main};
  background-color: ${({ theme, boolean }) =>
    boolean ? theme.color.main : '#fff'};
  margin-right: ${(props) => props.gifticon && '10px'};
`;
