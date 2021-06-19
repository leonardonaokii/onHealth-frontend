import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #f0f2f5;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: #383838;
  }

  body, input, button {
    font-family: "Roboto", serif;
    font-size: 14px;
    color: #383838;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    color: #383838;

  }

  button {
    cursor: pointer;
    color: #383838;
  }
`;
