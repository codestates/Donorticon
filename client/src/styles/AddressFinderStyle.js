import styled from 'styled-components';

export const AddressContainer = styled.div`
  margin: 10px 0;
  width: ${(props) => props.mypage && '80%'};
  @media ${({ theme }) => theme.device.mobile} {
    width: ${(props) => props.mypage && '100%'};
  }
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
  font-size: 13px;
  width: 90px;
  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

export const AddressInput = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  padding: 10px;
  border: 1px solid
    ${(props) =>
      props.mypage
        ? props.theme.color.lightGrey
        : props.theme.color.progressBar};
`;
