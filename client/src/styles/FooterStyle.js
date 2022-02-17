import styled from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  background-color: #dddddd;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: 500;
  padding-bottom: 20px;
`;

export const IconContainer = styled.div`
  > a {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const ContentContainer = styled.div`
  padding: 40px 0;
  display: flex;
`;

export const Content = styled.div`
  text-align: center;
  &:not(:last-child) {
    padding-right: 40px;
    @media ${({ theme }) => theme.device.mobile} {
      padding-right: 15px;
    }
  }
`;

export const MemberName = styled.div`
  padding-bottom: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 12px;
  }
`;

export const MemberPoition = styled.div`
  padding-bottom: 10px;
  color: #a2a2a2;
  font-size: 12px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 10px;
  }
`;

export const MemberGithub = styled.div`
  color: #858585;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: black;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 8px;
  }
`;

export const Comment = styled.div`
  color: #a2a2a2;
  font-size: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 8px;
  }
`;
