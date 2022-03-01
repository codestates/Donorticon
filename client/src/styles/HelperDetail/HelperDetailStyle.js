import styled from 'styled-components';
import { Container } from '../utils/Container';
import { Button } from '../utils/Button';

export const HelperDetailContainer = styled(Container)`
  width: 100%;
  padding: 40px 0;
`;

export const HelperDetailBox = styled.div`
  width: 60%;
`;

export const TopBox = styled.div`
  display: flex;
  padding: 40px 0;
  border-bottom: 2px solid ${({ theme }) => theme.color.progressBar};
`;

export const LeftBox = styled.div`
  width: 30%;
`;
export const RightBox = styled.div`
  width: 70%;
  text-align: left;
  padding-left: 40px;
  position: relative;
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
`;

export const Slogan = styled.div`
  font-size: 30px;
  font-weight: 500;
  padding: 20px 0;
`;

export const HelperName = styled.div`
  color: ${({ theme }) => theme.color.lightGrey};
  font-size: 25px;
  font-weight: 500;
  padding-top: 20px;
`;

export const DonateButton = styled(Button)`
  width: 20%;
  margin: 0;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const BottomBox = styled.div`
  padding-top: 40px;
`;

export const Title = styled.div`
  text-align: left;
  font-size: 22px;
  padding-bottom: 20px;
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
`;

export const BottomButton = styled(Button)`
  width: 20%;
  margin: 40px 0;
`;
