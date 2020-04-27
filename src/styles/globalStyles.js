import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    padding: 0;
  }
  a {
    color: ${({ theme }) => theme.text};
    text-decoration: underline;
  }
  `;

export default GlobalStyles;
