import React from 'react';
import { Container, Content, Spinner } from 'native-base';
import Header from './Header';

export default function AppLoading() {
  return (
    <Container>
      <Header title="Antivirus Tracker" />
      <Content>
        <Spinner color="blue" />
      </Content>
    </Container>
  );
}
