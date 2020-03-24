import React, { useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import PointChart from './PointChart';
import Button from '../styles/Button';
import Card from '../styles/Card';

const DashboardCol = styled(Col)`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: calc(60px + 1rem);
  }
`;

export default function Dashboard() {
  const [redirect, setRedirect] = useState('');

  function handleRiskClick() {
    setRedirect('/risks');
  }

  function handleActionClick() {
    setRedirect('/actions');
  }

  const randomTip = useMemo(() => {
    const tips = [
      'Do not panic. Try to focus on virus prevention instead!',
      'Observe personal hygiene.',
      'Wash your hands with soap frequently (and also more than 20 seconds).',
      'Rub your hands and face with a wet wipe.',
      'Do not touch your face/nose/eyes with your hands.',
      'Do not touch your face/nose/eyes with your hands.',
      'Try to sneeze and cough only in your handkerchief (or use your sleeve).',
      'If you are older than 60, try to stay home as long as possible.',
      'Take care of your elderly relatives.',
      'Take care of your elderly relatives.',
    ];

    return tips[Math.floor(Math.random() * tips.length)];
  }, []);

  if (redirect.length > 0) {
    return <Redirect exact to={redirect} />;
  }

  return (
    <Container className="d-flex justify-content-center pt-3">
      <Row className="w-100">
        <Col className="mb-3" xs="12" lg="4">
          <PointChart />
        </Col>
        <Col xs="12" lg="8">
          <Row>
            <DashboardCol xs="6">
              <Button block onClick={handleRiskClick} size="lg" variant="danger">
                risk
              </Button>
            </DashboardCol>
            <DashboardCol xs="6">
              <Button block onClick={handleActionClick} size="lg" variant="success">
                action
              </Button>
            </DashboardCol>
            <DashboardCol xs="12">
              <Card>
                <Card.Body>
                  <Card.Title variant="info">New notification</Card.Title>
                  <Card.Text>Wash your hands with soap for 20 seconds or more.</Card.Text>
                </Card.Body>
              </Card>
            </DashboardCol>
            <DashboardCol xs="12">
              <Card>
                <Card.Body>
                  <Card.Title variant="warning">Useful tip</Card.Title>
                  <Card.Text>{randomTip}</Card.Text>
                </Card.Body>
              </Card>
            </DashboardCol>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
