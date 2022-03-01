import styled from 'styled-components';

export const AddressContainer = styled.div`
  margin: 10px 0;
  width: ${(props) => props.mypage && '80%'};
  @media ${({ theme }) => theme.device.mobile} {
    width: ${(props) => props.mypage && '100%'};
  }
`;

export const AddressBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  font-size: 15px;
`;

export const AddressTitle = styled.div``;

export const AddressEdit = styled.button`
  text-align: right;
  cursor: pointer;
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
