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
  mobile: '414px',
  tablet: '828px',
  laptop: '1240px',
  big: '2560px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSize.mobile})`,
  tablet: `screen and (max-width: ${deviceSize.tablet})`,
  laptop: `screen and (max-width: ${deviceSize.laptop})`,
  big: `screen and (max-width: ${deviceSize.big})`,
};

const theme = { color, device };

export default theme;
