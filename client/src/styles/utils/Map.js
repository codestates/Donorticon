import styled from 'styled-components';

export const MapContainer = styled.div`
  width: ${(props) => (props.detail ? '100%' : '500px')};
  height: 400px;
  margin: 0 auto;
`;

export const NoInfoBox = styled.div`
  text-align: left;
  font-size: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;
