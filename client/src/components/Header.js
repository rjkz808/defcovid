import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.accent};
  box-shadow: 0px 0px 15px 0.5px ${props => props.theme.colors.accent};
  height: 60px;
`;

const HeaderText = styled.h1`
  width: 100%;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  color: ${props => props.theme.colors.foreground};
  line-height: 1;
  font-weight: 400;
  padding: 14px 0;
  margin: 0;
  letter-spacing: 3px;
  text-shadow: 0px 0px 5px ${props => props.theme.colors.foreground};
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Container>
        <HeaderText>Anti-Virus</HeaderText>
      </Container>
    </HeaderContainer>
  );
}
