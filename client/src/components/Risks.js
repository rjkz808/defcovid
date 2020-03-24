import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import UserContext from '../contexts/UserContext';
import PointCard from './PointCard';

export default function Risks() {
  const userContext = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect exact to="/" />;
  }

  const actions = [
    { title: 'Snake hands', points: 7 },
    { title: 'Hug, kiss', points: 8 },
    {
      title: 'In the common areas I touched the handrails/buttons/handles/taps',
      points: 6,
    },
    { title: 'Contact with a colleague at work/large team', points: 8 },
    { title: 'I used cash', points: 6 },
    { title: 'Close distance when talking with people', points: 5 },
    { title: 'I drove in public transport', points: 7 },
    { title: 'I had guests', points: 5 },
    { title: 'I visited a store/mall', points: 7 },
    { title: 'I visited the train station/airport', points: 9 },
    { title: 'Food in a public place', points: 6 },
    { title: 'I visited a medical facility/pharmacy', points: 8 },
    { title: 'I have a fever', points: 7 },
    {
      title: 'I have a dry cough, pant/shortness of breath when doing a light exercise',
      points: 8,
    },
    { title: 'I walked my pet on the street', points: 6 },
    { title: 'I hugged with a human who is infected COVID-19', points: 100 },
  ].map((action, idx) => {
    async function handleClick() {
      await userContext.subtractPoints(action.points);
      setRedirect(true);
    }

    return (
      <PointCard key={idx} onClick={handleClick} points={action.points} variant="danger">
        {action.title}
      </PointCard>
    );
  });

  return (
    <Container>
      <Row>{actions}</Row>
    </Container>
  );
}
