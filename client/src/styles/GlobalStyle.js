import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    html,body {
        font-size: 15px;
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

        @media (max-width: 414px) {
            font-size: 14px;
         }
    }
    a {
        text-decoration:none;
        color:inherit;
        cursor: pointer;
    }
    button {
        all:unset;  
    }
`;

export default GlobalStyle;
