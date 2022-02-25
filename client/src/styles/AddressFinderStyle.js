import styled from 'styled-components';

export const AddressContainer = styled.div`
  margin: 10px 0;
`;

export const AddressBox = styled.div`
  display: flex;
  direction: row;
  padding-bottom: 10px;
`;

export const AddressTitle = styled.div`
  font-size: ${(props) => props.mypage && '13px'};
`;

export const AddressEdit = styled.button`
  margin-left: auto;
  cursor: pointer;
  color: ${({ theme }) => theme.color.mainDark};
  font-size: ${(props) => props.mypage && '13px'};
`;

export const AddressInput = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.progressBar};
  background-color: none;
`;
