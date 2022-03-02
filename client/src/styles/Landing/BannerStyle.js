import styled from 'styled-components';
import '@fontsource/baloo-2';

export const BannerContainer = styled.div`
  margin-top: 75px;
  width: 100%;
  height: 100vh;
  position: relative;
  color: black;
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
  @media ${({ theme }) => theme.device.tablet} {
    padding-top: 75px;
    display: flex;
    flex-direction: column;
    z-index: -1;
  }
`;

export const TextBox = styled.div`
  font-family: 'Baloo 2', sans-serif;
  padding-left: 20px;
  grid-column: 1 / -1;
  grid-row: 1;
  width: 100%;
  animation: outer-left 1s 1s ease both;
  height: 300px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.main};
  padding-top: 50px;
  @media ${({ theme }) => theme.device.tablet} {
    height: 40%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    height: 30%;
    animation: none;
    padding-top: 0;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
`;

export const TitleInner = styled.div`
  display: inline-block;
  animation: inner-left 1s 1s ease both;
  @media ${({ theme }) => theme.device.mobile} {
    animation: none;
  }
`;

export const Top = styled.div`
  font-size: 55px;
  animation: outer-left 1s 1s cubic-bezier(0.5, 0, 0.1, 1) both;
  /* > div {
    display: inline-block;
  } */
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 35px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    animation: none;
    font-size: 25px;
  }
`;

export const Bottom = styled.div`
  font-size: 125px;
  margin-top: 25px;
  letter-spacing: 5px;
  font-variation-settings: 'wght' 800;
  display: inline-block;
  animation: outer-left 1s 1s cubic-bezier(0.5, 0, 0.1, 1) both;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 70px;
    letter-spacing: 2px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    animation: none;
    font-size: 50px;
  }
`;

export const TopInner = styled.div`
  display: inline-block;
  animation: inner-left 1s 1s ease both,
    text-clip 1s 0s cubic-bezier(0.5, 0, 0.1, 1) both;
  @media ${({ theme }) => theme.device.mobile} {
    animation: none;
  }
`;

export const BottomInner = styled.div`
  animation: text-clip 1s 0s cubic-bezier(0.5, 0, 0.1, 1) both;
  font-weight: 800;
  @media ${({ theme }) => theme.device.mobile} {
    animation: none;
  }
`;

export const ImageBox = styled.div`
  grid-row: 1;
  grid-column: 2;
  margin-left: 300px;
  animation: image-in 3.5s cubic-bezier(0.5, 0, 0.1, 1) 2s backwards;
  width: 70%;
  z-index: 1;
  @keyframes image-in {
    from {
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }
    to {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    margin-left: 0;
    height: 60%;
    display: flex;
    align-items: flex-end;
    margin-bottom: 50px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    height: 70%;
    animation: none;
  }

  img {
    display: block;
    width: 100%;
    height: calc(100vh - 75px);
    object-fit: contain;
    @media ${({ theme }) => theme.device.tablet} {
      height: inherit;
      object-fit: fill;
    }
  }
`;
