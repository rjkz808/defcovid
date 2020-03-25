import React, { useContext, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled, { ThemeContext } from 'styled-components';
import UserContext from '../contexts/UserContext';
import Card from '../styles/Card';

const MAX_POINTS = 100;

const ProfileIcon = styled.i`
  width: fit-content;
  height: fit-content;
  line-height: 1;
  font-size: 150px;
  margin: 0;
  color: ${props => props.theme.colors[props.variant]};
  text-shadow: 0px 0px 6px ${props => props.theme.colors[props.variant]};
`;

const ProfileInfoCol = styled(Col)`
  height: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h5 {
    color: ${props => props.theme.colors[props.variant]};
    margin: 0;
    font-size: 25px;
    font-weight: 500;
    text-shadow: 0px 0px 3px ${props => props.theme.colors[props.variant]};
    font-family: 'Roboto', sans-serif;
  }

  div {
    display: flex;
    align-items: center;
    margin: 0;

    p {
      font-size: 25px;
      font-weight: 300;
      color: ${props => props.theme.colors.foreground};
      opacity: 0.8;
      line-height: 1;
      margin: 0;
      margin-right: 10px;
      font-family: 'Roboto', sans-serif;
    }
  }
`;

const ProfileBadge = styled(Badge)`
  margin: 0;
  height: 20px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0px 0px 6px 0.5px ${props => props.theme.colors[props.variant]};
  background-color: ${props => props.theme.colors[props.variant]};
  color: ${props =>
    props.variant === 'foreground' ? props.theme.colors.accent : props.theme.colors.foreground};
`;

const ProfileCard = styled(Card)`
  padding: 0;
  margin-bottom: 1rem;
`;

ProfileCard.Body = styled(ProfileCard.Body)`
  padding: 0;
  padding-top: 5px;
`;

const ChartCardTitle = styled(Card.Title)`
  color: ${props => props.theme.colors.foreground};
  margin-bottom: 0.3rem;
  font-size: 25px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  width: 100%;
  text-align: center;
  text-shadow: 0px 0px 3px ${props => props.theme.colors.foreground};
`;

const ChardCardText = styled(Card.Text)`
  width: 100%;
  text-align: center;
  margin-bottom: 0.6rem;
`;

export default function Profile() {
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);

  const riskPoints = useMemo(() => {
    let result = 0;

    if (userContext.user.sex.toLowerCase() === 'male') {
      result += 20;
    }

    if (userContext.user.dangerousAge) {
      result += 30;
    }

    if (userContext.user.chronicDiseases) {
      result += 20;
    }

    if (userContext.user.contact) {
      result += 30;
    }

    return result;
  }, [
    userContext.user.sex,
    userContext.user.dangerousAge,
    userContext.user.chronicDiseases,
    userContext.user.contact,
  ]);

  const variant = useMemo(() => {
    if (riskPoints === 100) {
      return 'danger';
    } else if (riskPoints >= 60) {
      return 'warning';
    } else if (riskPoints >= 30) {
      return 'yellow';
    } else {
      return 'success';
    }
  }, [riskPoints]);

  const data = useMemo(
    () => [
      {
        name: 'fill',
        value: riskPoints,
        color: themeContext.colors[variant],
      },
      {
        name: 'empty',
        value: MAX_POINTS - riskPoints,
        color: themeContext.colors.transparent,
      },
    ],
    [riskPoints, variant, themeContext.colors]
  );

  const cells = useMemo(() => {
    return data.map(entry => (
      <Cell
        stroke={themeContext.colors.foreground}
        strokeWidth="0.1em"
        key={entry.name}
        fill={entry.color}
      />
    ));
  }, [data, themeContext.colors]);

  return (
    <Container className="mt-3">
      <ProfileCard>
        <ProfileCard.Body>
          <Row>
            <Col xs="5">
              <ProfileIcon className="material-icons-outlined" variant={variant}>
                account_circle
              </ProfileIcon>
            </Col>
            <ProfileInfoCol variant="foreground" xs="7">
              <h5>{userContext.user.name}</h5>
              <div>
                <p>{userContext.user.dangerousAge ? '>' : '<'}60 y.o.</p>
                {userContext.user.sex.toLowerCase() === 'male' ||
                userContext.user.sex.toLowerCase() === 'female' ? (
                  <ProfileBadge variant={variant}>{userContext.user.sex}</ProfileBadge>
                ) : (
                  <React.Fragment />
                )}
              </div>
            </ProfileInfoCol>
          </Row>
        </ProfileCard.Body>
      </ProfileCard>
      <ProfileCard>
        <ProfileCard.Body style={{ padding: '1rem' }}>
          <ChartCardTitle>State of immunity</ChartCardTitle>
          <ChardCardText>
            - {userContext.user.chronicDiseases ? 'C' : 'No c'}hronic diseases
            <br />- {userContext.user.contact ? 'C' : 'No c'}ontact with infected people
          </ChardCardText>
          <div style={{ height: '30vh' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="70%"
                  outerRadius="100%"
                  stroke="none  "
                  dataKey="value"
                  startAngle={450}
                  endAngle={90}
                >
                  {cells}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ProfileCard.Body>
      </ProfileCard>
    </Container>
  );
}
