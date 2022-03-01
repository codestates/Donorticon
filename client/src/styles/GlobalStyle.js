import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;&display=swap');
    * {
        box-sizing: border-box;
    }
    html,body {
        font-size: 18px;
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'baloo';
        @media (max-width: 414px) {
            font-size: 15px;
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
