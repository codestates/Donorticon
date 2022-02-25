import styled from 'styled-components';
import { Container, SubContainer } from './utils/Container';

// 마이페이지 & 기부내역리스트 & 기부상세내역 공통 적용 사항
export const CommonContainer = styled(Container)`
  width: 100%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
    margin: 0 auto;
  }
`;

export const TopContainer = styled(SubContainer)`
  width: 60%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    padding-top: 40px;
  }
`;

export const BottomContainer = styled.div`
  width: 60%;
  display: flex;
  padding: 40px 0;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 40px;
  }
`;

export const ContentContainer = styled.div`
  width: 70%;
  display: ${(props) => props.mypage && 'flex'};
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    padding-top: 40px;
  }
`;

export const ContentTitle = styled.div`
  font-size: 18px;
  text-align: left;
  padding-bottom: 20px;
  padding-top: ${(props) => props.top && '20px'};
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 16px;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  align-items: ${(props) => (props.center ? 'center' : 'end')};
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  }
`;

export const ImageBox = styled.div`
  width: 40%;
  //TODO: height는 사진 크기에 따라서 변경할 것
  height: 300px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    margin-right: 0;
  }
`;
