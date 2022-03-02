import styled from 'styled-components';

export const HomeContainer = styled.div`
  margin-top: -75px; // 이 값은 HEADER 값과 동일해야함!!
  position: relative;
  width: 100%;
  height: auto;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SubContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.color.main};
  padding-bottom: 20px;
`;

export const HelperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
`;

export const HelperHeightContainer = styled.div`
  min-height: 1100px;
  width: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    min-height: 0;
  }
`;

export const GifticonHeightContainer = styled.div`
  min-height: 1200px;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.main};
  font-size: 38px;
  letter-spacing: 15px;
  font-weight: 700;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 30px;
  }
`;

export const HelperTitle = styled(Title)`
  text-align: center;
  padding: 40px 0;
`;

export const SubTitle = styled.div`
  padding-top: 40px;
  padding-bottom: 20px;
  letter-spacing: 10px;
  font-size: 28px;
  font-weight: 500;
  line-height: initial;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 20px;
    letter-spacing: 5px;
  }
`;
