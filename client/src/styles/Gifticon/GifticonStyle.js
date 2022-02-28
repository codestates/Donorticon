import styled from 'styled-components';

export const Div = styled.div`
  padding: 20px 0;
`;

export const GifticonStatusButton = styled.button`
  width: 100%;
  padding: 10px 0;
  text-align: center;
  background-color: ${(props) =>
    props.text === '사용함'
      ? props.theme.color.main
      : props.text === '신고됨'
      ? props.theme.color.error
      : null};
  border: 1px solid
    ${(props) =>
      props.textStyle === 1 ? props.theme.color.main : props.theme.color.error};
`;

export const CountMessage = styled.div`
  font-size: 20px;
  text-align: left;
  padding-top: 40px;
  padding-bottom: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    text-align: center;
    font-size: 18px;
  }
`;

export const NoGifticonMessage = styled.div`
  font-size: 18px;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  height: calc(100vh - 200px);
  line-height: 45px;
  padding-top: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 15px;
    text-align: center;
  }
`;

export const DonateButton = styled.button`
  border: 1px solid ${({ theme }) => theme.color.main};
  cursor: pointer;
  margin-top: 10px;
  width: 100px;
  &:hover {
    background-color: ${({ theme }) => theme.color.main};
  }
`;
export const BoldText = styled.span`
  font-weight: 700;
`;
