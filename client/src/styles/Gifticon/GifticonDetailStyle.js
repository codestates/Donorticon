import styled from 'styled-components';

export const InfoBox = styled.div`
  width: 60%;
  height: 300px;
  margin-left: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    margin-left: 0;
    height: auto;
  }
`;

export const InputBox = styled.div`
  text-align: left;
  padding-top: ${(props) => (props.giver === 1 ? '150px' : '100px')};
  div {
    display: flex;
    margin-top: 10px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding-top: 0;
  }
`;

export const InputLabel = styled.div`
  width: 30%;
`;

export const InputContent = styled.div`
  padding-left: ${(props) => (props.noLine ? '0' : '10px')};
  padding-bottom: 10px;
  width: 70%;
  border-bottom: ${(props) => (props.noLine ? 'none' : '1px solid #a2a2a2')};
`;

export const GifticonButton = styled.button`
  cursor: pointer;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.color.main};
`;

export const DropDownContainer = styled.div`
  width: 70%;
  @media ${({ theme }) => theme.device.mobile} {
    padding-bottom: 40px;
  }
`;
