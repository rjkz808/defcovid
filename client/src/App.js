import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Roboto', sans-serif;
    font-size: calc(1em + 1vw);
    margin: 0;
    padding: 0;
  }
`;

const Root = styled.div`
  background-color: #050b17;
  min-width: 100wv;
  min-height: 100vh;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Root>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Root>
    </>
  );
}
