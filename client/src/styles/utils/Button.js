import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.main};
  cursor: pointer;
  padding: 10px 0;
  margin: 10px 0;
  text-align: center;
  &:hover {
    background: #fff;
    background-color: ${({ theme }) => theme.color.main};
    transition: 0.7s;
  }
`;
