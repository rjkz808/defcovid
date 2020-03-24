import React, { useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Card from '../styles/Card';

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
`;

ProfileCard.Body = styled(ProfileCard.Body)`
  padding: 0;
  padding-top: 5px;
`;

export default function Profile() {
  const { user } = useContext(UserContext);

  function getVariant() {
    if (user.points > 0) {
      return 'success';
    } else if (user.points === 0) {
      return 'foreground';
    } else {
      return 'danger';
    }
  }

  return (
    <Container className="mt-3">
      <ProfileCard>
        <ProfileCard.Body>
          <Row>
            <Col xs="5">
              <ProfileIcon className="material-icons-outlined" variant={getVariant()}>
                account_circle
              </ProfileIcon>
            </Col>
            <ProfileInfoCol variant="foreground" xs="7">
              <h5>{user.name}</h5>
              <div>
                <p>{user.dangerousAge ? '>' : '<'}60 y.o.</p>
                {user.sex.toLowerCase() === 'male' || user.sex.toLowerCase() === 'female' ? (
                  <ProfileBadge variant={getVariant()}>{user.sex}</ProfileBadge>
                ) : (
                  <React.Fragment />
                )}
              </div>
            </ProfileInfoCol>
          </Row>
        </ProfileCard.Body>
      </ProfileCard>
    </Container>
  );
}
