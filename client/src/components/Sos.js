import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import Card from '../styles/Card';

const SosCardText = styled(Card.Text)`
  font-size: 24px;

  a {
    color: ${props => props.theme.colors.danger};
    font-weight: 500;
  }
`;

const SosIcon = styled.i`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  line-height: 1;
  font-size: 150px;
  margin: 0;
  color: ${props => props.theme.colors.danger};
  text-shadow: 0px 0px 6px ${props => props.theme.colors.danger};
`;

const SosLabel = styled.h1`
  font-family: 'Roboto', sans-serif;
  width: 100%;
  display: flex;
  justify-content: center;
  line-height: 1;
  color: ${props => props.theme.colors.danger};
  text-shadow: 0px 0px 6px ${props => props.theme.colors.danger};
  margin: 0;
  font-size: 70px;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

export default function Sos() {
  return (
    <Container className="mt-3">
      <SosIcon className="material-icons-outlined">report_problem</SosIcon>
      <SosLabel>SOS</SosLabel>
      <Card className="mb-4">
        <Card.Body>
          <SosCardText>
            If you had contact with a person infected with COVID-19, make sure to notify{' '}
            <a href="tel:103">103</a> of this!
          </SosCardText>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <SosCardText>
            In the presence of high fever, dry cough, shortness of breath - contact{' '}
            <a href="tel:103">103</a> as soon as possible!
          </SosCardText>
        </Card.Body>
      </Card>
    </Container>
  );
}
