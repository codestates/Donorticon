import styled from 'styled-components';

// GifticonCard & HelperCard 공통 적용
export const CardContainer = styled.div`
  width: ${(props) => (props.gifticon ? '100%' : '50%')};
  padding: 20px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  @media ${({ theme }) => theme.device.tablet} {
    width: ${(props) => (props.gifticon ? '100%' : '90%')};
  }
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(1, 1fr);
    width: ${(props) => (props.gifticon ? '100%' : '80%')};
  }
`;

export const CardBox = styled.div`
  padding: 20px;
  width: 100%;
  height: auto;
  cursor: pointer;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
`;

export const CardGallery = styled.img`
  width: ${(props) => (props.empty ? '40%' : '100%')};
  height: ${(props) => (props.empty ? '100px' : '200px')};
`;

export const EmptyBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.gifticon ? 'column' : 'row')};
  padding-top: 20px;
`;

// ============================================
// HelperCard
export const HelperImage = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

export const HelperName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export const Slogan = styled.div`
  text-align: left;
  font-size: 18px;
  padding-top: 10px;
`;

export const HelperBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ============================================
// GifticonCard
export const GifticonInfo = styled.div`
  text-align: left;
  padding-bottom: 10px;
  font-size: ${(props) => (props.gifticon ? '18px' : 'inherit')};
  font-weight: ${(props) => (props.gifticon ? '500' : 'inherit')};
`;
