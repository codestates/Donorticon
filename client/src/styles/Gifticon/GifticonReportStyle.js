import styled from 'styled-components';

export const ReportButtonBox = styled.div`
  text-align: right;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 10px 0;
  }
`;

export const ReportButton = styled.button`
  padding: 10px;
  color: ${({ theme }) => theme.color.error};
  border: 1px solid ${({ theme }) => theme.color.error};
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.color.error};
    color: #fff;
    pointer-events: none;
  }
`;
