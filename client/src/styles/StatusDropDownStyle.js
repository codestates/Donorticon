import styled from 'styled-components';
import { GifticonStatusButton } from './Gifticon/GifticonStyle';

export const StatusContainer = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
`;

export const StatusBox = styled.div``;

export const DropDownStatusButton = styled(GifticonStatusButton)`
  position: relative;
  .icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
`;

export const DropDownItems = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  border: 1px solid #000;
  background-color: white;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
`;

export const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 14px;
  border-bottom: 1px solid #000;
  border-top: none;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemName = styled.p`
  font-weight: bold;
`;
