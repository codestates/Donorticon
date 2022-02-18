import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SubContainer = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.color.main};
  padding-bottom: 20px;
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

export const SubTitle = styled.div`
  padding-top: 40px;
  padding-bottom: 20px;
  letter-spacing: 10px;
  font-size: 28px;
  font-weight: 500;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 20px;
  }
`;