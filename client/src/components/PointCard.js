import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../styles/Card';

const PointCol = styled(Col)`
  cursor: pointer;
  margin-bottom: 1rem;

  &:first-child {
    margin-top: 1rem;
  }

  &:last-child {
    margin-bottom: calc(60px + 1rem);
  }
`;

const PointCardText = styled(Card.Text)`
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    width: 290px;
  }
`;

const PointBadge = styled(Badge)`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  box-shadow: 0px 0px 6px 0.5px ${props => props.theme.colors[props.variant]};
`;

function PointCard(props) {
  return (
    <PointCol xs="12">
      <Card onClick={props.onClick}>
        <Card.Body>
          <PointCardText variant="foreground">
            <div>{props.children}</div>
            <PointBadge variant={props.variant}>{props.points}</PointBadge>
          </PointCardText>
        </Card.Body>
      </Card>
    </PointCol>
  );
}

PointCard.defaultProps = {
  children: <React.Fragment />,
  onClick: () => {},
  points: 0,
  variant: 'success',
};

PointCard.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  points: PropTypes.number,
  variant: PropTypes.oneOf(['danger', 'success']),
};

export default PointCard;
