import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import Chart from './Chart';

const DashboardContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

export default function Dashboard() {
  const [points, setPoints] = React.useState(0);

  return (
    <DashboardContainer>
      <Chart points={points} />
    </DashboardContainer>
  );
}
