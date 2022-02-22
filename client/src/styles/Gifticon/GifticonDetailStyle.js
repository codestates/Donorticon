import styled from 'styled-components';

export const GifticonDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // 나중에 CSS 작업시 Container 성질 가져와도 댐
`;

export const GifticonBox = styled.div`
  display: flex;
  align-items: end;
`;

export const Title = styled.div`
  font-size: ${(props) => (props.top ? '20px' : 'inherit')};
`;

export const GifticonInputBox = styled.div`
  align-items: bottom;
`;

export const GifticonButton = styled.button`
  cursor: pointer;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.color.main};
`;

export const PointImage = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: pointer;
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
