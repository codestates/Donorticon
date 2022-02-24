import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  text-align: left;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }
`;

export const Item = styled.button`
  all: unset;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.main};
  padding: 10px;
  width: 100px;
  text-align: center;
  margin-bottom: 20px;
  &:hover {
    background-color: ${({ theme }) => theme.color.main};
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 80px;
    margin-bottom: 0;
    margin-right: ${(props) => props.first && '20px'};
  }
`;

export const StyledLink = styled(Link)`
  all: unset;
`;
