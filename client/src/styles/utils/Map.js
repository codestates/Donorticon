import styled from 'styled-components';

export const MapContainer = styled.div`
  width: ${(props) => (props.detail ? '100%' : '500px')};
  height: 400px;
  margin: 0 auto;
`;

export const NoInfoBox = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;
