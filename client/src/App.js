import { ThemeProvider } from 'styled-components';
import Router from './Router';
import GlobalStyle from './styles/global-styles';
import Theme from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
