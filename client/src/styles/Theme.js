// 전역으로 사용할 색상
const color = {
  main: '#FFCE44',
  mainDark: '#E5B93D',
  error: '#B71C1C',
  lightGrey: '#a2a2a2',
  darkGrey: '#858585',
  progressBar: '#f2f2f2',
};

// 반응형 대응하기 위한 화면 크기
const deviceSize = {
  mobile: '540px',
  tablet: '767px',
  laptop: '1024px',
  desktop: '1280px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSize.mobile})`,
  tablet: `screen and (max-width: ${deviceSize.tablet})`,
  laptop: `screen and (max-width: ${deviceSize.laptop})`,
  big: `screen and (max-width: ${deviceSize.big})`,
};

const theme = { color, device };

export default theme;
