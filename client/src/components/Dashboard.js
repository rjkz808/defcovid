import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import PointChart from './PointChart';
import * as constants from '../constants';
import Button from '../styles/Button';
import Card from '../styles/Card';

const DashboardCol = styled(Col)`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: calc(60px + 1rem);
  }
`;

export default function Dashboard() {
  const [points, setPoints] = useState(0);

  function handleRiskClick() {
    setPoints(points => (points > constants.MIN_POINTS ? points - 1 : points));
  }

  function handleActionClick() {
    setPoints(points => (points < constants.MAX_POINTS ? points + 1 : points));
  }

  return (
    <Container className="d-flex justify-content-center pt-3">
      <Row className="w-100">
        <Col className="mb-3" xs="12" lg="4">
          <PointChart points={points} />
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
                  <Card.Text>Do not touch your face/nose/eyes with your hands.</Card.Text>
                </Card.Body>
              </Card>
            </DashboardCol>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
