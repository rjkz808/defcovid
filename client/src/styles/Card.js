import BsCard from 'react-bootstrap/Card';
import styled from 'styled-components';

const Card = styled(BsCard)`
  background-color: ${props => props.theme.colors.accent};
  border-radius: 0.3rem;
  color: ${props => props.theme.colors.foreground};
  box-shadow: 0px 0px 15px 0.5px ${props => props.theme.colors.accent};
`;

Card.Body = styled(Card.Body)`
  padding: 15px;
`;

Card.Title = styled(Card.Title)`
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.colors[props.variant]};
  font-weight: 400;
  font-size: 20px;
  margin: 0;
  padding: 0;
  line-height: 1.3;
`;

Card.Text = styled(Card.Text)`
  color: ${props => props.theme.colors[props.variant]};
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.3;
  margin: 0;
  padding: 0;
  opacity: 0.9;
`;

export default Card;
