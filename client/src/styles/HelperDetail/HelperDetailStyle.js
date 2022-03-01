import styled from 'styled-components';
import { Container } from '../utils/Container';
import { Button } from '../utils/Button';

export const HelperDetailContainer = styled(Container)`
  width: 100%;
  padding: 40px 0;
`;

export const HelperDetailBox = styled.div`
  width: 60%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

export const TopBox = styled.div`
  display: flex;
  padding: 40px 0;
  border-bottom: 2px solid ${({ theme }) => theme.color.progressBar};
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    padding: 20px 0;
  }
`;

export const LeftBox = styled.div`
  width: 30%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const RightBox = styled.div`
  width: 70%;
  text-align: left;
  padding-left: 40px;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    padding-left: 0;
  }
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 250px;
`;

export const Category = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
  div {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;
export const CategoryName = styled.div`
  border: 1px solid #000;
  padding: 5px 10px;
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 10px;
    font-size: 18px;
  }
`;

export const Slogan = styled.div`
  font-size: 30px;
  font-weight: 500;
  padding: 20px 0;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 25px;
    line-height: normal;
  }
`;

export const HelperName = styled.div`
  color: ${({ theme }) => theme.color.lightGrey};
  font-size: 25px;
  font-weight: 500;
  padding-top: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 20px;
  }
`;

export const DonateButton = styled(Button)`
  width: 20%;
  margin: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 30%;
  }
`;

export const BottomBox = styled.div`
  padding-top: 40px;
`;

export const Title = styled.div`
  text-align: left;
  font-size: 22px;
  padding-bottom: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 20px;
  }
`;

export const Icon = styled.div`
  display: inline;
  margin-right: 10px;
`;

export const Content = styled.div`
  text-align: justify;
  font-size: 20px;
  line-height: 1.5;
  div {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;

export const BottomButton = styled(Button)`
  width: 20%;
  margin: 40px 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
  }
`;
