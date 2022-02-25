import styled from 'styled-components';

export const InfoBox = styled.div`
  width: 60%;
  //TODO: height는 사진 크기에 따라서 변경할 것
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
  //TODO: 이부분 설정!!! 추후 변경 필요
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

// 기프티콘 상태 변경하는 모달창
export const StatusModalFrame = styled.div`
  text-align: center;
  align-items: center;
  width: 30%;
  height: 50%;
  padding: 10px;
  background-color: #fff;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 70%;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

export const ModalButton = styled.div`
  width: 100%;
  padding: 10px 0;
  border: 1px solid black;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
