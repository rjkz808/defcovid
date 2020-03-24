import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Actions from './components/Actions';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Risks from './components/Risks';
import Theme from './components/Theme';
import { PointsContextProvider } from './contexts/PointsContext';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Roboto', sans-serif;
    font-size: calc(1em + 1vw);
    margin: 0;
    padding: 0;
  }
`;

const Root = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-width: 100wv;
  min-height: 100vh;
`;

export default function App() {
  return (
    <Theme>
      <GlobalStyle />
      <Root>
        <PointsContextProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/actions" component={Actions} />
              <Route path="/risks" component={Risks} />
              <Route component={NotFound} />
            </Switch>
            <Navbar />
          </BrowserRouter>
        </PointsContextProvider>
      </Root>
    </Theme>
  );
}
