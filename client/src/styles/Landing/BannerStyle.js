import styled from 'styled-components';

export const BannerContainer = styled.div`
  margin-top: 75px;
  width: 100%;
  height: calc(100vh - 75px);
  position: relative;
  color: black;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  @keyframes text-clip {
    from {
      clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
    }
    to {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }

  @keyframes outer-left {
    from {
      transform: translateX(50%);
    }
    to {
      transform: none;
    }
  }

  @keyframes inner-left {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: none;
    }
  }
`;

export const TextBox = styled.div`
  font-family: 'baloo';
  padding-left: 20px;
  grid-column: 1 / -1;
  grid-row: 1;
  width: 100%;
  z-index: 2;
  animation: outer-left 1s 1s ease both;
  height: 300px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.main};
  padding-top: 50px;
`;

export const TitleInner = styled.div`
  display: inline-block;
  animation: inner-left 1s 1s ease both;
`;

export const Top = styled.div`
  font-size: 60px;
  animation: outer-left 1s 1s cubic-bezier(0.5, 0, 0.1, 1) both;
  > div {
    display: inline-block;
  }
`;

export const Bottom = styled.div`
  font-size: 125px;
  margin-top: 25px;
  letter-spacing: 5px;

  display: inline-block;
  animation: outer-left 1s 1s cubic-bezier(0.5, 0, 0.1, 1) both;
`;

export const TopInner = styled.div`
  display: inline-block;
  animation: inner-left 1s 1s ease both,
    text-clip 1s 0s cubic-bezier(0.5, 0, 0.1, 1) both;
`;

export const BottomInner = styled.div`
  animation: text-clip 1s 0s cubic-bezier(0.5, 0, 0.1, 1) both;
`;

export const ImageBox = styled.div`
  grid-row: 1;
  grid-column: 2;
  margin-left: 300px;
  animation: image-in 5s cubic-bezier(0.5, 0, 0.1, 1) 2s backwards;
  width: 70%;
  z-index: 100;
  @keyframes image-in {
    from {
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }
    to {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }

  img {
    display: block;
    width: 100%;
    height: calc(100vh - 75px);
    object-fit: contain;
  }
`;
