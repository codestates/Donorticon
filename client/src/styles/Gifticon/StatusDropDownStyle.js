import styled from 'styled-components';
import { GifticonStatusButton } from './GifticonStyle';

export const StatusContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const StatusBox = styled.div``;

export const DropDownStatusButton = styled(GifticonStatusButton)`
  position: relative;
  cursor: pointer;
  pointer-events: ${(props) =>
    props.status === '사용함'
      ? 'none'
      : props.status === '신고됨'
      ? 'none'
      : props.status === '거절됨'
      ? 'none'
      : 'inherit'};
  .icon {
    position: absolute;
    bottom: 7px;
    right: 5px;
    display: ${(props) =>
      props.status === '사용함'
        ? 'none'
        : props.status === '신고됨'
        ? 'none'
        : props.status === '거절됨'
        ? 'none'
        : 'inherit'};
  }
`;

export const DropDownItems = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  background-color: white;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
`;

export const DropdownItemContainer = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGrey};
  border-top: none;
  &:hover {
    background-color: ${({ theme }) => theme.color.main};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemName = styled.p`
  font-weight: bold;
`;
