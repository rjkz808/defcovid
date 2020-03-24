import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Actions from './components/Actions';
import Auth from './components/Auth';
import Daily from './components/Daily';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Risks from './components/Risks';
import Sos from './components/Sos';
import Theme from './components/Theme';
import { UserContextProvider } from './contexts/UserContext';

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
        <UserContextProvider>
          <Header />
          <Auth>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/actions" component={Actions} />
                <Route path="/risks" component={Risks} />
                <Route path="/profile" component={Profile} />
                <Route path="/sos" component={Sos} />
                <Route path="/daily" component={Daily} />
                <Route component={NotFound} />
              </Switch>
              <Navbar />
            </BrowserRouter>
          </Auth>
        </UserContextProvider>
      </Root>
    </Theme>
  );
}
