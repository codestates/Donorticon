import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;
    color: {
      main: string;
      mainDark: string;
      error: string;
    };
  }
}
