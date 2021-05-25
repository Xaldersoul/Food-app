import React from 'react'
import Main from './components/main';
import Principal from "./components/principal/index"
import { Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  body {
  margin: 0;
  padding: 0;
  background-color: rgb(60,60,60);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`;

function App() {
  return (
    <>
      <Global />
      <Route exact path="/" component={Main} />
      <Route path="/recipes" component={Principal} />
    </>
  );
}

export default App;
